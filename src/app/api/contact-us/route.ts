import { NextResponse } from "next/server";

// Force dynamic to prevent build-time errors regarding environment variables
export const dynamic = "force-dynamic";
// Note: OpenNext Cloudflare adapter handles edge runtime automatically

interface ContactFormData {
  email: string;
  topics: string[];
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Ensure you use the exact name from your Cloudflare Dashboard
    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (!sheetUrl) {
      console.error("Missing NEXT_PUBLIC_GOOGLE_SHEET_URL");
      return NextResponse.json(
        { success: false, error: "Sheet URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(sheetUrl, {
      method: "POST",
      // Note: Google Apps Script often expects 'text/plain' or handles redirects
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      return NextResponse.json({ success: true, response: json });
    } catch {
      console.error("Non-JSON response from Google Sheet:", text);
      return NextResponse.json(
        { success: false, error: "Google Sheet returned invalid JSON", raw: text },
        { status: 502 }
      );
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error sending to Google Sheet:", err.message);
    return NextResponse.json(
      { success: false, error: "Internal server error", message: err.message },
      { status: 500 }
    );
  }
}