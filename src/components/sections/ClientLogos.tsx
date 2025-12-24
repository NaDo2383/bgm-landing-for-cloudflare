"use client"

import { useEffect, useMemo } from "react"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import PopInSection from "../PopInSection"
import clsx from "clsx"

export default function ClientLogos({ className }: { className: string }) {
  const logos = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({ src: `/partners/${(i % 6) + 1}.png` })),
    []
  )

  // ⬇️ Тасралтгүй урсгал
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        speed: 1.1, // урсгалын хурд (санах: px/frame орчим)
        startDelay: 0, // эхлэхдээ шууд хөдөлнө
        stopOnInteraction: false,
        stopOnMouseEnter: true, // desktop дээр hover хийхэд түр зогсооно
        playOnInit: true,
      }),
    []
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      skipSnaps: true,
      containScroll: "trimSnaps",
    },
    [autoScroll]
  )

  useEffect(() => {
    if (!emblaApi) return

    // Re-init on resize for better sizing when breakpoints change
    const onResize = () => emblaApi.reInit()
    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, [emblaApi])

  // Respect user reduced-motion preference: stop autoplay
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (m.matches) autoScroll.stop?.()
  }, [autoScroll])

  return (
    <PopInSection from='bottom' amount={0}>
      <section className={clsx("bg-[#000] overflow-hidden ", className)}>
        <div className='mx-auto max-w-7xl px-4'>
          {/* Embla viewport */}
          <div
            ref={emblaRef}
            className='overflow-hidden'
            aria-label='Our clients and partners'
            // Edge fade with CSS mask (Safari uses WebKitMask)
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            }}>
            {/* Embla container */}
            <div className='flex space-x-4 sm:space-x-6 lg:space-x-10'>
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  // Slide width scales with breakpoints
                  className='flex-none w-24 sm:w-36 md:w-44 lg:w-52 xl:w-56'
                  aria-hidden='false'>
                  <div className='flex h-full items-center justify-center'>
                    <img
                      src={logo.src}
                      alt={`Client Logo ${idx + 1}`}
                      // Constrain logo height responsively; scale width automatically
                      className='
                      h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain
                      grayscale md:hover:grayscale-0 transition-all duration-300
                    '
                      loading='lazy'
                      decoding='async'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PopInSection>
  )
}
