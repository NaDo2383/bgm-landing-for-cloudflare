// src/app/api/news/[id]/route.ts
export const runtime = "edge"; // This removes the lag!
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

// You will need these environment variables in Cloudflare
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_REST_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/news`;

/** GET /api/news/:id */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Using native fetch instead of adminDB to support Edge Runtime
    const res = await fetch(`${FIREBASE_REST_URL}/${id}`);

    if (res.status === 404) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const data = await res.json();

    // Firestore REST API returns data in a specific "fields" format, 
    // you might need a helper to flatten it.
    return NextResponse.json({ id, ...data.fields });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

/** DELETE /api/news/:id */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Note: For DELETE/PUT via REST, you need an Auth Token (OAuth2)
    // If this is a private admin route, you must pass a Bearer token.
    const res = await fetch(`${FIREBASE_REST_URL}/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${process.env.FIREBASE_AUTH_TOKEN}`
      }
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}