import { getDocument, deleteDocument } from "@/lib/firebase-server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// Note: OpenNext Cloudflare adapter handles edge runtime automatically

/**
 * GET /api/news/:id
 * Fetches a single news item by ID
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getDocument("news", id);

    if (!data) {
      return NextResponse.json(
        { error: "News item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: data._id,
      title: data.title ?? "",
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? "",
      createdAt: data.createdAt ?? null,
    });
  } catch (err) {
    console.error("[GET News ID Error]:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/news/:id
 * Removes a news item by ID
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First check if document exists
    const data = await getDocument("news", id);
    if (!data) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    await deleteDocument("news", id);

    return NextResponse.json({
      message: "Successfully deleted",
      id
    });
  } catch (err) {
    console.error("[DELETE News ID Error]:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
