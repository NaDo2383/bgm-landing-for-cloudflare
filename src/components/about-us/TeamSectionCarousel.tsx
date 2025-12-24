"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import React, { useEffect, useMemo, useRef, useState } from "react"

export default function TeamSectionCarousel() {
  const t = useTranslations("about-us")

  const managersData = useMemo(
    () => [
      {
        name: t("ceo-name"),
        pos: t("ceo-pos"),
        text: t("ceo-creeting"),
        img: "ceo.png",
      },
      {
        name: t("cio-name"),
        pos: t("cio-pos"),
        text: t("cio-creeting"),
        img: "cio.png",
      },
    ],
    [t]
  )

  const [index, setIndex] = useState(0)
  const count = managersData.length

  const hovering = useRef(false)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)
  const reducedMotion = useRef<boolean>(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  // auto slide (3s) — reduced-motion бол унтраана
  useEffect(() => {
    if (count <= 1 || reducedMotion.current) return
    const id = setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % count)
    }, 3000)
    return () => clearInterval(id)
  }, [count])

  const onEnter = () => (hovering.current = true)
  const onLeave = () => (hovering.current = false)

  // touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }
  const onTouchEnd = () => {
    const THRESHOLD = 50 // px
    if (Math.abs(touchDeltaX.current) > THRESHOLD) {
      if (touchDeltaX.current < 0) {
        // next
        setIndex((i) => (i + 1) % count)
      } else {
        // prev
        setIndex((i) => (i - 1 + count) % count)
      }
    }
    touchStartX.current = null
    touchDeltaX.current = 0
  }

  return (
    <section
      id='team'
      className='relative bg-[linear-gradient(180deg,#000_0%,#111_100%)] border border-[#434343] rounded-3xl md:rounded-[40px] lg:rounded-[50px] max-w-[1214px] mx-auto py-6 md:py-10 lg:py-20 px-4 md:px-8 lg:px-[72px] my-24 md:my-40 lg:my-60'
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-roledescription='carousel'
      aria-label='Leadership carousel'>
      <div className='overflow-hidden max-w-[1112px] mx-auto'>
        <div
          className='flex transition-transform duration-700 ease-out will-change-transform'
          style={{ transform: `translateX(-${index * 100}%)` }}>
          {managersData.map((m, i) => (
            <div key={i} className='w-full shrink-0 px-0'>
              <div className='flex flex-col md:flex-row items-stretch md:items-center md:justify-between max-w-[1112px] mx-auto'>
                {/* Текст тал */}
                <div className='w-full md:w-[60%] md:min-w-[513px] flex flex-col justify-center gap-4 sm:gap-5 md:gap-6'>
                  <div className='text-white font-norms-pro font-[450] text-[15px] sm:text-lg md:text-[22px] lg:text-[26px]  whitespace-pre-wrap'>
                    {m.text}
                  </div>
                  <div className='flex flex-wrap items-end gap-3 sm:gap-5 md:gap-[44px]'>
                    <div className='text-white text-xl sm:text-[28px] md:text-[32px] font-[500] font-norms-pro leading-none'>
                      {m.name}
                    </div>
                    <div className='text-[#F1883F] text-sm sm:text-base md:text-[22px] font-norms-pro leading-none'>
                      {m.pos}
                    </div>
                  </div>
                </div>

                {/* Зураг тал */}
                <div className='w-full md:w-[40%] md:min-w-[420px] lg:md:min-w-[460px]'>
                  {/* aspect wrapper — мобайлд тогтвортой харьцаа */}
                  <div className='relative w-full md:w-[460px] mx-auto md:mx-0'>
                    <div className='relative w-full aspect-[23/27] md:aspect-auto md:h-[540px] overflow-hidden rounded-xl md:rounded-2xl'>
                      <Image
                        src={`/${m.img}`}
                        alt={`${m.name} portrait`}
                        fill
                        sizes='(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 460px'
                        className='object-cover'
                        priority={i === index}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Дотууд */}
        {count > 1 && (
          <div className='absolute left-0 right-0 bottom-4 md:bottom-6 lg:-bottom-14 flex items-center justify-center gap-3 sm:gap-4 md:gap-6'>
            {managersData.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 rounded-full cursor-pointer border border-white/60 transition-colors",
                  i === index ? "bg-white" : "bg-transparent",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
