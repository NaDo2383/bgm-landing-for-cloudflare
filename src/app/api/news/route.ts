// src/app/api/news/route.ts
import { getAdminDB } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Force this route to be dynamic to prevent Next.js from attempting 
// to initialize Firebase during the static build phase.
export const dynamic = 'force-dynamic';

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

// ---------- UTILS ----------
function toMillis(value: unknown): number | null {
  if (value && typeof (value as any).toMillis === "function") return (value as any).toMillis();
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  return null;
}

// ---------- GET ----------
export async function GET(req: NextRequest) {
  try {
    // Initialize DB only when the request is made
    const db = getAdminDB();

    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
      after: searchParams.get("after") ?? undefined,
      latest: searchParams.get("latest") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const { limit = 20, after, latest } = parsed.data;

    // Handle 'latest' shortcut
    if (latest) {
      const snap = await db
        .collection("news")
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();

      if (snap.empty) {
        return NextResponse.json({ item: null }, { status: 200 });
      }

      const doc = snap.docs[0];
      const d = doc.data() as Record<string, any>;
      const createdAt = toMillis(d.createdAt);

      return NextResponse.json(
        {
          item: {
            id: doc.id,
            title: d.title ?? "",
            description: d.description ?? "",
            imageUrl: d.imageUrl ?? "",
            createdAt,
          },
        },
        { status: 200, headers: { "Cache-Control": "private, max-age=5" } }
      );
    }

    // Normal paginated list
    let q = db.collection("news").orderBy("createdAt", "desc").limit(limit);
    if (after) q = q.startAfter(new Date(after));

    const snap = await q.get();
    const items = snap.docs.map((doc) => {
      const d = doc.data() as Record<string, any>;
      const createdAt = toMillis(d.createdAt);
      return {
        id: doc.id,
        title: d.title ?? "",
        description: d.description ?? "",
        imageUrl: d.imageUrl ?? "",
        createdAt,
      };
    });

    const last = snap.docs.at(-1);
    const nextCursor =
      last?.get("createdAt")?.toMillis?.() ??
      (last?.get("createdAt") instanceof Date
        ? (last.get("createdAt") as Date).getTime()
        : null);

    return NextResponse.json(
      { items, nextCursor: nextCursor ?? null },
      { status: 200, headers: { "Cache-Control": "private, max-age=5" } }
    );
  } catch (err) {
    console.error("[GET /api/news] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ---------- POST ----------
export async function POST(req: NextRequest) {
  try {
    const db = getAdminDB();
    const json = await req.json();
    const parsed = PostSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { title, description, imageUrl } = parsed.data;
    const ref = await db.collection("news").add({
      title,
      description,
      imageUrl: imageUrl ?? null,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/news] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}