// src/app/api/news/route.ts
import { adminDB } from "@/lib/firebase-admin"
import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"

type OutlookDoc = {
  id: string
  title: string
  path: string
  year: number
  createdAt: Timestamp | Date | null | undefined
}

type PostBody = {
  title: string
  path: string
  year: number
}

// Helper: normalize createdAt to milliseconds for sorting
function toMillis(value: OutlookDoc["createdAt"]): number {
  if (value instanceof Date) return value.getTime()
  if (value instanceof Timestamp) return value.toMillis()
  // Fallbacks for unexpected shapes
  if (value && typeof (value as any).toMillis === "function") return (value as any).toMillis()
  if (typeof value === "number") return value
  return 0
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const yearParam = searchParams.get("year")
  const year = yearParam ? Number(yearParam) : undefined
  const isYearValid = Number.isInteger(year as number)

  const col = adminDB.collection("outlook")

  const snapshot = isYearValid
    ? await col.where("year", "==", year).get()
    : await col.get()

  const data: OutlookDoc[] = snapshot.docs.map((doc) => {
    const raw = doc.data() as Omit<OutlookDoc, "id">
    return { id: doc.id, ...raw }
  })

  const sorted = data.sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt)) // newest first
  return NextResponse.json(sorted)
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<PostBody>

    // Minimal runtime validation to satisfy TS + avoid bad writes
    if (!body?.title || !body?.path || typeof body?.year !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const ref = await adminDB.collection("outlook").add({
      title: body.title,
      path: body.path,
      year: body.year,
      createdAt: new Date(), // or use admin.firestore.FieldValue.serverTimestamp()
    })

    return NextResponse.json({ id: ref.id }, { status: 201 })
  } catch (err) {
    console.error("[POST /api/outlook] Error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
