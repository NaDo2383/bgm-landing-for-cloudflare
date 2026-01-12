// src/app/api/outlook/[id]/route.ts
import { updateDocument, deleteDocument } from "@/lib/firebase-server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// Note: OpenNext Cloudflare adapter handles edge runtime automatically

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await updateDocument("outlook", id, body);
    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error("[PUT /api/outlook/:id] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteDocument("outlook", id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("[DELETE /api/outlook/:id] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
