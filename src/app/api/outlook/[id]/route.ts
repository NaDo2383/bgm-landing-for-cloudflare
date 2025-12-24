export const dynamic = 'force-dynamic';
//src\app\api\news\[id]\route.ts
import { adminDB } from "@/lib/firebase-admin"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json()
  await adminDB.collection("outlook").doc(id).update(body)
  return NextResponse.json({ message: "Updated" })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await adminDB.collection("outlook").doc(id).delete()
  return NextResponse.json({ message: "Deleted" })
}

