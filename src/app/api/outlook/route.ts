// src/app/api/outlook/route.ts
import { getCollection, createDocument } from "@/lib/firebase-server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// Note: OpenNext Cloudflare adapter handles edge runtime automatically

type OutlookDoc = {
  _id?: string;
  id?: string;
  title: string;
  path: string;
  year: number;
  createdAt: number | null;
};

type PostBody = {
  title: string;
  path: string;
  year: number;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const year = yearParam ? Number(yearParam) : undefined;

    // Fetch all outlook documents
    const data = await getCollection("outlook", {
      orderBy: "createdAt",
      orderDirection: "DESCENDING",
    });

    // Format and filter by year if provided
    let items: OutlookDoc[] = data.map((doc) => ({
      id: doc._id,
      title: doc.title ?? "",
      path: doc.path ?? "",
      year: doc.year ?? 0,
      createdAt: doc.createdAt ?? null,
    }));

    // Filter by year if specified
    if (Number.isInteger(year)) {
      items = items.filter((item) => item.year === year);
    }

    // Sort by createdAt descending (newest first)
    items.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

    return NextResponse.json(items);
  } catch (err) {
    console.error("[GET /api/outlook] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<PostBody>;

    // Minimal runtime validation
    if (!body?.title || !body?.path || typeof body?.year !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const id = await createDocument("outlook", {
      title: body.title,
      path: body.path,
      year: body.year,
      createdAt: new Date(),
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/outlook] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

