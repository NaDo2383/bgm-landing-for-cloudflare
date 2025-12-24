"use client"

import { useEffect, useRef, useState } from "react"
import { PageFlip } from "page-flip"
import type { FlipSetting, SizeType } from "page-flip"
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/types/src/display/api"

type Props = {
  src: string // "/sample.pdf" or full URL (needs CORS)
  renderScale?: number // quality multiplier on top of DPR (1..2.5 is sane)
  className?: string
  maxPagePx?: number // hard cap per-page bitmap width (default 2400)
}

export default function PdfFlipBookPF({
  src,
  renderScale = 1.25,
  className,
  maxPagePx = 2400,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null) // wrapper you see on screen
  const stageRef = useRef<HTMLDivElement | null>(null) // PageFlip mounts here
  const flipRef = useRef<PageFlip | null>(null)

  const [containerW, setContainerW] = useState(0)
  const [imgs, setImgs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  // Track container width (for responsive, hi-dpi rendering)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContainerW(el.clientWidth))
    ro.observe(el)
    setContainerW(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  // Render PDF -> high-quality images (client only)
  useEffect(() => {
    if (!containerW) return
    let cancelled = false
    // Keep previous blob URLs to revoke later
    const createdUrls: string[] = []

    ;(async () => {
      try {
        setLoading(true)
        setErr(null)

        const { getDocument, GlobalWorkerOptions, version } = await import("pdfjs-dist")
        // Use ESM worker (.mjs). If you copied it to /public, prefer: "/pdf.worker.min.mjs"
        GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`

        const pdf: PDFDocumentProxy = await getDocument(src).promise

        // Estimate CSS page width (two columns on wide screens)
        const innerPad = 32
        const isTwoCols = containerW >= 768
        const cssPageW = Math.max(
          320,
          isTwoCols
            ? Math.floor((containerW - innerPad * 2) / 2)
            : Math.floor(containerW - innerPad * 2)
        )

        // Device pixel ratio (cap for perf)
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
        const targetPxW = Math.min(Math.round(cssPageW * dpr * renderScale), maxPagePx)

        const out: string[] = []
        for (let i = 1; i <= pdf.numPages; i++) {
          const page: PDFPageProxy = await pdf.getPage(i)
          const base = page.getViewport({ scale: 1 })
          const scale = targetPxW / base.width
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          canvas.width = Math.ceil(viewport.width)
          canvas.height = Math.ceil(viewport.height)
          if (!ctx) throw new Error("Canvas 2D context not available")

          await page.render({ canvasContext: ctx, viewport }).promise

          // Prefer WEBP for smaller crisp bitmaps; fallback to PNG
          const blob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/webp", 0.98)
          )
          let url: string
          if (blob) {
            url = URL.createObjectURL(blob)
          } else {
            url = canvas.toDataURL("image/png")
          }
          createdUrls.push(url)
          out.push(url)
        }

        if (!cancelled) setImgs(out)
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load PDF")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
      // Revoke any object URLs we created to free memory
      createdUrls.forEach((u) => {
        if (u.startsWith("blob:")) URL.revokeObjectURL(u)
      })
    }
  }, [src, renderScale, containerW, maxPagePx])

  // Initialize PageFlip with generated images
  useEffect(() => {
    if (!stageRef.current || imgs.length === 0) return
    try {
      flipRef.current?.destroy()
    } catch {}
    flipRef.current = null

    const cfg: FlipSetting = {
      width: 550,
      height: 733,
      // TS enum vs runtime string mismatch: pass string, cast for TS
      size: "stretch" as unknown as SizeType,

      minWidth: 300,
      maxWidth: 1600,
      minHeight: 400,
      maxHeight: 2000,

      // look/animation
      drawShadow: true,
      flippingTime: 600,
      maxShadowOpacity: 0.5,
      showCover: false,

      // behavior
      usePortrait: true,
      autoSize: true,
      mobileScrollSupport: true,
      showPageCorners: true,

      // fields that some strict typings require:
      startPage: 0,
      startZIndex: 0,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 30,
      disableFlipByClick: false,
    }

    const flip = new PageFlip(stageRef.current, cfg)
    flip.loadFromImages(imgs)
    flipRef.current = flip

    return () => {
      try {
        flip.destroy()
      } catch {}
      flipRef.current = null
    }
  }, [imgs])

  const canNavigate = imgs.length > 0

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className='relative w-full h-[90vh] rounded-xl bg-[#0F172B] overflow-hidden'>
        {loading && (
          <div className='absolute inset-0 grid place-items-center text-gray-400'>
            Rendering pages…
          </div>
        )}
        {err && (
          <div className='absolute inset-0 grid place-items-center text-red-400'>
            {err}
          </div>
        )}
        <div
          ref={stageRef}
          className='w-full h-full'
          style={{ opacity: loading ? 0 : 1, transition: "opacity .2s" }}
        />
      </div>

      <div className='my-2 flex items-center justify-center gap-3'>
        <button
          className='px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40'
          disabled={!canNavigate}
          onClick={() => flipRef.current?.flipPrev()}>
          Prev
        </button>
        <button
          className='px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-40'
          disabled={!canNavigate}
          onClick={() => flipRef.current?.flipNext()}>
          Next
        </button>
      </div>
    </div>
  )
}
