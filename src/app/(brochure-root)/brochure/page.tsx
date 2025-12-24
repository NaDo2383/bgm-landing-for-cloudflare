"use client"
import dynamic from "next/dynamic"

const PdfFlipBookPF = dynamic(() => import("@/components/brochur/PdfFlipBookPF"), {
  ssr: false,
})

export default function Page() {
  return (
    <main className='min-h-screen bg-[#0B1220] text-white  '>
      <div className='mx-auto w-full max-w-6xl'>
        <PdfFlipBookPF src='/borchure_compressed.pdf' renderScale={2} />
      </div>
    </main>
  )
}
