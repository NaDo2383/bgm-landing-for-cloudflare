import { NextResponse } from "next/server"

interface SearchJobType {
  age: string
  education: string
  email: string
  name: string
  phone: string
  position: string
}

export async function POST(request: Request) {
  try {
    const data: SearchJobType = await request.json()

    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL_1
    if (!sheetUrl) {
      return NextResponse.json(
        { success: false, error: "Sheet URL not configured" },
        { status: 500 }
      )
    }

    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })


    const text = await response.text()

    try {
      const json = JSON.parse(text)
      return NextResponse.json({ success: true, response: json })
    } catch {
      console.error("Non-JSON response from Google Sheet:", text)
      return NextResponse.json(
        { success: false, error: "Google Sheet returned invalid JSON", raw: text },
        { status: 502 }
      )
    }
  } catch (error: unknown) {
    const err = error as Error
    console.error("Error sending to Google Sheet:", err.message)
    return NextResponse.json(
      { success: false, error: "Internal server error", message: err.message },
      { status: 500 }
    )
  }
}
