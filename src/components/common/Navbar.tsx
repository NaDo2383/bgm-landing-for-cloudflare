"use client"

import { useEffect, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import LanguageSelector from "./LanguageSelector"
import Button from "../ui/Button"
import Image from "next/image"
import Link from "next/link"
import { useScrollToId } from "@/utils/utils"

export default function Navbar() {
  const t = useTranslations("nav")
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((v) => !v), [])

  const scrollTo = useScrollToId()

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Common nav links
  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Link
        href='/about-us'
        onClick={onClick}
        className='text-white/90 hover:text-white text-[14px] transition whitespace-pre text-center'>
        {t("about")}
      </Link>
      <Link
        href='/asset-management'
        onClick={onClick}
        className='text-white/90 hover:text-white text-[14px] transition whitespace-pre text-center'>
        {t("management")}
      </Link>
      <Link
        href='/careers'
        onClick={onClick}
        className='text-white/90 hover:text-white text-[14px] transition whitespace-pre text-center'>
        {t("careers")}
      </Link>
      <Link
        href='/news-Insight'
        onClick={onClick}
        className='text-white/90 hover:text-white text-[14px] transition whitespace-pre text-center'>
        {t("news")}
      </Link>
    </>
  )

  return (
    <nav className='fixed top-0 w-full backdrop-blur-sm z-50'>
      <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] lg:py-[10px] py-3'>
        <div className='flex items-center justify-between'>
          <Link href='/' aria-label='Go to homepage' className='shrink-0'>
            <Image src='/bgm_logo.png' alt='Logo' width={188} height={40} priority />
          </Link>

          {/* Desktop nav */}
          <div className='hidden md:flex items-center gap-[30px]'>
            <NavLinks />
          </div>

          {/* Right side: lang + CTA (desktop) */}
          <div className='hidden md:flex items-center space-x-4'>
            <LanguageSelector />
            <Button
              variant='transparent'
              onClick={() => {
                scrollTo("/", "subscribe")
              }}>
              {t("subscribe")}
            </Button>
          </div>

          {/* Mobile: hamburger + lang */}
          <div className='md:hidden flex items-center gap-2'>
            <LanguageSelector />
            <button
              onClick={toggle}
              aria-expanded={open}
              aria-controls='mobile-menu'
              aria-label='Open menu'
              className='inline-flex items-center justify-center rounded-lg p-2 outline-none ring-0 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40'>
              {/* Hamburger / Close icon */}
              <span className='sr-only'>Menu</span>
              <svg
                className={`h-6 w-6 transition-transform ${
                  open ? "scale-0" : "scale-100"
                }`}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <path d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              <svg
                className={`h-6 w-6 absolute transition-transform ${
                  open ? "scale-100" : "scale-0"
                }`}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <path d='M6 6l12 12M18 6l-12 12' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Mobile slide-in menu */}
      <div
        id='mobile-menu'
        className={`md:hidden fixed top-0 right-0 h-screen w-[78%] max-w-[360px] backdrop-blur-md bg-black/40 border-l border-white/10 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role='dialog'
        aria-modal='true'>
        <div className='flex items-center justify-between px-5 py-4 border-b border-white/10'>
          <Link href='/' onClick={close} className='shrink-0'>
            <Image src='/bgm_logo.png' alt='Logo' width={140} height={32} />
          </Link>
          <button
            onClick={close}
            aria-label='Close menu'
            className='rounded-lg p-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40'>
            <svg
              className='h-6 w-6'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'>
              <path d='M6 6l12 12M18 6l-12 12' />
            </svg>
          </button>
        </div>

        <div className='flex flex-col gap-1 p-4'>
          <NavLinks onClick={close} />
          <div className='mt-3 pt-3 border-t border-white/10'>
            <Button variant='transparent' className='w-full' onClick={close}>
              {t("subscribe")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
