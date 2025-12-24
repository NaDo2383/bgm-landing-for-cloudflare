"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"

interface NewsCardProps {
  title: string
  description: string
  imageUrl?: string
  id: string
  className?: string
  featured?: boolean // optional: make the first card wider elsewhere
}

export default function NewsCard({
  title,
  description,
  imageUrl,
  id,
  className,
  featured = false,
}: NewsCardProps) {
  return (
    <Link href={`/news-Insight/${id}`} className='group block h-full focus:outline-none'>
      <motion.div
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={clsx(
          "h-full rounded-[30px] p-3 sm:p-4 md:p-5", // ← padding responsive
          "bg-[linear-gradient(#171717,#111111)] border border-[#434343]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
          "flex flex-col",
          className
        )}>
        {/* Image */}
        <div
          className={clsx(
            "relative overflow-hidden rounded-[15px]",
            featured
              ? "aspect-[16/9] sm:aspect-[21/8]" // ← mobile арай өндөр, ≥sm анхны харьцаа
              : "aspect-[4/3] sm:aspect-[36/23]" // ← mobile 4:3, ≥sm анхны харьцаа
          )}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]'
              priority={false}
            />
          ) : (
            <div className='absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800' />
          )}

          {/* subtle inner border/highlight to match mock */}
          <div className='pointer-events-none absolute inset-0 rounded-[15px] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]' />
        </div>

        {/* Text */}
        <h3 className='mt-3 sm:mt-4 text-white leading-tight font-semibold text-[16px] sm:text-[18px] md:text-[20px] line-clamp-2'>
          {title}
        </h3>

        <p
          className='mt-1.5 sm:mt-2 text-[#AFAFAF] leading-5 sm:leading-6 text-[13px] sm:text-sm md:text-[15px] line-clamp-3'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.div>
    </Link>
  )
}
