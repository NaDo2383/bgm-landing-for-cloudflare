// app/api/pdf-proxy/route.ts
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic";
// Note: OpenNext Cloudflare adapter handles edge runtime automatically

function extractDriveFileId(input: string): string | null {
  try {
    const url = new URL(input)
    // Patterns we handle:
    // 1) https://drive.google.com/file/d/<ID>/view?usp=sharing
    // 2) https://drive.google.com/open?id=<ID>
    // 3) https://drive.google.com/uc?export=download&id=<ID>
    // 4) A raw id
    if (url.hostname.includes("drive.google.com")) {
      const m = url.pathname.match(/\/file\/d\/([^/]+)/)
      if (m?.[1]) return m[1]
      const id = url.searchParams.get("id")
      if (id) return id
    }
  } catch {
    /* not a URL -> maybe user passed the id directly */
  }
  // If it looks like a Drive id, accept as-is (rough check)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(input)) return input
  return null
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const src = searchParams.get("src")
    const id = searchParams.get("id")

    if (!src && !id) {
      return NextResponse.json({ error: "Provide ?src=<drive_url> or ?id=<file_id>" }, { status: 400 })
    }

    const fileId = id ?? extractDriveFileId(src!)
    if (!fileId) {
      // Not a drive file; allow proxying any HTTPS PDF if you want:
      const direct = src!
      const upstream = await fetch(direct, { redirect: "follow" })
      if (!upstream.ok) {
        return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: upstream.status })
      }
      const headers = new Headers(upstream.headers)
      headers.set("Content-Type", upstream.headers.get("Content-Type") ?? "application/pdf")
      headers.set("Cache-Control", "public, max-age=3600")
      headers.set("Access-Control-Allow-Origin", "*")
      return new NextResponse(upstream.body, { status: 200, headers })
    }

    // Prefer Google Drive API if you have a public file + API key
    const apiKey = process.env.GOOGLE_API_KEY
    let driveUrl: string
    if (apiKey) {
      // Public file: anyone with link + API key access
      driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`
    } else {
      // Fallback (small files, may fail on “confirm” gate for large files)
      driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
    }

    const upstream = await fetch(driveUrl, {
      // no credentials; we fetch public bytes only
      redirect: "follow",
    })

    // If Google returns HTML (viewer/confirm), try to detect & error
    const contentType = upstream.headers.get("content-type") || ""
    if (!upstream.ok || contentType.includes("text/html")) {
      return NextResponse.json(
        {
          error:
            "Failed to fetch raw PDF from Drive. Make sure the file is public 'Anyone with the link'. For large files, use the Drive API path with GOOGLE_API_KEY.",
          status: upstream.status,
        },
        { status: 502 }
      )
    }

    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Cache-Control", "public, max-age=3600")
    headers.set("Access-Control-Allow-Origin", "*")

    return new NextResponse(upstream.body, { status: 200, headers })
  } catch (err) {
    console.error("[GET /api/pdf-proxy] error:", err)
    return NextResponse.json({ error: "Proxy error" }, { status: 500 })
  }
}
