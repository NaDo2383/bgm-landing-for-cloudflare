// components/LatestNewsPanel.tsx
import React from "react"
import { newsType } from "./NewsInsightPage"
import { timeAgoFromMs } from "@/utils/utils"

type Props = {
  items: newsType[]
  title?: string
  className?: string
  onItemClick?: (id: string) => void
  maxHeight?: number
}

export default function LatestNewsPanel({
  items,
  title = "LATEST NEWS",
  className,
  onItemClick,
  maxHeight = 520,
}: Props) {
  return (
    <div>
      <h2 className='font-xwide bg-[linear-gradient(90deg,#FFFFFF,#111111)] bg-clip-text text-transparent font-bold text-[32px] mb-6 ml-6'>
        {title}
      </h2>
      <aside
        className={`rounded-[25px] bg-[linear-gradient(#262626,#171717)] ring-1 ring-white/10 p-5 ${
          className ?? ""
        }`}>
        {/* Visible, styled scrollbar */}
        <style>{`
        .show-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.25) transparent; }
        .show-scroll::-webkit-scrollbar { width: 8px; }
        .show-scroll::-webkit-scrollbar-track { background: transparent; }
        .show-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.25); border-radius: 9999px; }
        .show-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.35); }
      `}</style>

        <div className='overflow-y-auto pr-2 show-scroll' style={{ maxHeight }}>
          <ul className='space-y-3'>
            {items.map((it) => (
              <div key={it.id} className='  p-4 flex gap-1.5 border-b border-[#434343]'>
                <span className='size-2.5 min-w-2.5 inline-flex rounded-full bg-orange-400/90 mt-1' />
                <button
                  className='text-left w-full font-norms-pro'
                  onClick={() => onItemClick?.(it.id)}>
                  <div className=' font-bold text-[14px]  text-[#AFAFAF]'>
                    <span className='uppercase tracking-wider'>
                      {timeAgoFromMs(it.createdAt)}
                    </span>
                  </div>

                  <h3
                    className='text-white font-bold text-[18px] line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: it.description }}
                  />
                </button>
              </div>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
