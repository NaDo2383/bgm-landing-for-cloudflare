"use client"

import React, { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import PopInSection from "../PopInSection"

type Item = {
  id: "fixed" | "realestate" | "retirement"
  img: string
}

const ITEMS: Item[] = [
  { id: "fixed", img: "/what-we-do/income-fund.png" },
  { id: "realestate", img: "/what-we-do/real-state-fund.png" },
  { id: "retirement", img: "/what-we-do/saving-fund.png" },
]

export default function WhatWeDo() {
  const t = useTranslations("whatWeDo")
  const [active, setActive] = useState<Item["id"]>(ITEMS[0].id)

  const activeItem = ITEMS.find((i) => i.id === active) ?? ITEMS[0]
  const activeAlt = t(`items.${activeItem.id}.alt`)

  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const idx = ITEMS.findIndex((i) => i.id === active)
      if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = (idx + 1) % ITEMS.length
        setActive(ITEMS[next].id)
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        const prev = (idx - 1 + ITEMS.length) % ITEMS.length
        setActive(ITEMS[prev].id)
      }
      if (e.key === "Home") {
        e.preventDefault()
        setActive(ITEMS[0].id)
      }
      if (e.key === "End") {
        e.preventDefault()
        setActive(ITEMS[ITEMS.length - 1].id)
      }
    },
    [active]
  )

  useEffect(() => {
    const down = () => document.documentElement.classList.add("using-mouse")
    const up = () => document.documentElement.classList.remove("using-mouse")
    window.addEventListener("mousedown", down)
    window.addEventListener("keydown", up)
    return () => {
      window.removeEventListener("mousedown", down)
      window.removeEventListener("keydown", up)
    }
  }, [])

  return (
    <PopInSection>
      <section className='bg-[#000] text-white pb-16 md:pb-20'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='text-center font-norms-pro'>
            <h2 className='text-4xl md:text-5xl font-medium tracking-tight'>
              {t("title")}
            </h2>
            <p className='mt-3 text-[#afafaf] whitespace-pre-wrap'>{t("subtitle")}</p>
          </div>

          <div
            className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'
            onKeyDown={onKey}
            role='listbox'
            aria-label={t("aria.listbox")}
            tabIndex={0}>
            {/* Left picture / visual */}
            <div className='relative aspect-[16/11] w-full rounded-[28px] overflow-hidden bg-[#141414] ring-1 ring-white/10 flex items-center justify-center'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeItem.img}
                  initial={{ opacity: 0.0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.995 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className='absolute inset-0'>
                  <Image
                    src={activeItem.img}
                    alt={activeAlt}
                    fill
                    className='object-cover'
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className='pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(80%_60%_at_0%_0%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(120%_100%_at_100%_100%,rgba(0,0,0,0.5),transparent_60%)]' />
              <div className='pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10' />
            </div>

            {/* Right list */}
            <div className='relative'>
              <div className='pl-6'>
                {ITEMS.map((it) => {
                  const isActive = it.id === active
                  const title = t(`items.${it.id}.title`)
                  const desc = t(`items.${it.id}.desc`)

                  return (
                    <button
                      key={it.id}
                      onClick={() => setActive(it.id)}
                      role='option'
                      aria-selected={isActive}
                      aria-label={t("aria.item", { title })}
                      className={[
                        "relative w-full text-left py-3 md:py-4 pl-6",
                        "focus:outline-none outline-offset-2",
                        isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
                      ].join(" ")}>
                      {/* rail + active indicator */}
                      <span
                        aria-hidden
                        className={[
                          "absolute left-0 -translate-x-1/2 top-0 bottom-0 z-10",
                          isActive
                            ? "w-[3px] bg-[#E85211] rounded-sm"
                            : "w-[1px] bg-[#AFAFAF]",
                        ].join(" ")}
                      />

                      <div className='flex items-start gap-2 pl-6 font-norms-pro'>
                        <div>
                          <h3 className='text-2xl md:text-[30px] font-semibold'>
                            {title}
                          </h3>
                          <p className='mt-1 text-[#AFAFAF] max-w-[52ch] leading-relaxed'>
                            {desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .using-mouse :focus {
            outline: none !important;
          }
        `}</style>
      </section>
    </PopInSection>
  )
}
