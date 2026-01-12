// src/app/api/news/route.ts
import { getCollection, createDocument } from "@/lib/firebase-server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Force this route to be dynamic to prevent Next.js from attempting 
// to initialize Firebase during the static build phase.
export const dynamic = 'force-dynamic';

// Note: OpenNext Cloudflare adapter handles edge runtime automatically

// ---------- SCHEMAS ----------
const PostSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(10_000),
  imageUrl: z.string().url().optional().or(z.literal("").transform(() => undefined)),
});

const QuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().min(1).max(50).optional()),
  after: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().positive().optional()),
  latest: z
    .string()
    .optional()
    .transform((v) => (v === "1" || v === "true" ? true : undefined)),
});

// ---------- GET ----------
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
      after: searchParams.get("after") ?? undefined,
      latest: searchParams.get("latest") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const { limit = 20, latest } = parsed.data;

    // Fetch news from Firestore via REST API
    const items = await getCollection("news", {
      orderBy: "createdAt",
      orderDirection: "DESCENDING",
      limit: latest ? 1 : limit,
    });

    // Handle 'latest' shortcut
    if (latest) {
      const item = items[0] || null;
      if (!item) {
        return NextResponse.json({ item: null }, { status: 200 });
      }

      return NextResponse.json(
        {
          item: {
            id: item._id,
            title: item.title ?? "",
            description: item.description ?? "",
            imageUrl: item.imageUrl ?? "",
            createdAt: item.createdAt,
          },
        },
        { status: 200, headers: { "Cache-Control": "private, max-age=5" } }
      );
    }

    // Normal paginated list
    const formattedItems = items.map((item) => ({
      id: item._id,
      title: item.title ?? "",
      description: item.description ?? "",
      imageUrl: item.imageUrl ?? "",
      createdAt: item.createdAt,
    }));

    const lastItem = items[items.length - 1];
    const nextCursor = lastItem?.createdAt ?? null;

    return NextResponse.json(
      { items: formattedItems, nextCursor },
      { status: 200, headers: { "Cache-Control": "private, max-age=5" } }
    );
  } catch (err: any) {
    console.error("[GET /api/news] Error:", err);
    return NextResponse.json({
      error: "Internal Server Error",
      details: err.message || String(err),
      env_check: {
        has_project_id: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }
    }, { status: 500 });
  }
}

// ---------- POST ----------
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = PostSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { title, description, imageUrl } = parsed.data;
    const id = await createDocument("news", {
      title,
      description,
      imageUrl: imageUrl ?? null,
      createdAt: new Date(),
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/news] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
