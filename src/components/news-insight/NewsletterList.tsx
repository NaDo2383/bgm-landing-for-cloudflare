// components/NewsletterList.tsx
import React from "react"
import Image from "next/image"
import { newsType } from "./NewsInsightPage"
import { timeAgoFromMs } from "@/utils/utils"

type Props = {
  items: newsType[]
  title?: string
  className?: string
  onItemClick?: (id: string) => void
}

export default function NewsletterList({
  items,
  title = "NEWSLETTER",
  className,
  onItemClick,
}: Props) {
  return (
    <section className={`w-full ${className ?? ""}`}>
      <h2 className='font-xwide bg-[linear-gradient(90deg,#FFFFFF,#111111)] bg-clip-text text-transparent font-bold text-[32px] mb-6 ml-6'>
        {title}
      </h2>

      <ul className='space-y-5'>
        {items.map((it) => (
          <li
            key={it.id}
            className='group rounded-[30px] p-4 flex items-center gap-4 transition font-norms-pro font-bold border border-[#434343]'>
            <button
              className='text-left flex flex-col justify-between h-[152px]'
              onClick={() => onItemClick?.(it.id)}>
              <h3
                className='text-white font-bold text-[18px] line-clamp-3 wrap-break-word max-w-[278px]'
                dangerouslySetInnerHTML={{ __html: it.description }}
              />
              <p className='mt-3 text-[14px] text-[#afafaf]'>
                {timeAgoFromMs(it.createdAt)}
              </p>
            </button>

            <div className='shrink-0'>
              {it.imageUrl && (
                <Image
                  src={it.imageUrl}
                  alt=''
                  width={216}
                  height={152}
                  className='h-[152px] w-[216px] rounded-[20px] object-cover '
                  sizes='(max-width: 1024px) 33vw, 140px'
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
