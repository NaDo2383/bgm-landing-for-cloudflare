import { getAdminDB } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";

/** * GET /api/news/:id 
 * Fetches a single news item by ID
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminDB(); // Singleton helper to avoid re-initialization

    const docSnap = await db.collection("news").doc(id).get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: "News item not found" },
        { status: 404 }
      );
    }

    const data = docSnap.data();

    return NextResponse.json({
      id: docSnap.id,
      ...data,
      // Helper: Firestore Timestamps need to be converted to JSON-friendly format
      createdAt: data?.createdAt?.toMillis?.() || data?.createdAt || null,
    });
  } catch (err) {
    console.error("[GET News ID Error]:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/** * DELETE /api/news/:id 
 * Removes a news item by ID
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getAdminDB();

    const docRef = db.collection("news").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    await docRef.delete();

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