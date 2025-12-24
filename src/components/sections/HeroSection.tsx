"use client"

import { useTranslations } from "next-intl"
import Button from "../ui/Button"

export default function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 -z-20'>
        <video
          muted
          loop
          autoPlay
          playsInline
          className='absolute inset-0 w-full h-full object-cover'>
          <source
            src='/https://pub-51a5a4fe828144e39fb1107407e6e30d.r2.dev/hero-video-2k.mp4'
            type='video/mp4'
          />
        </video>
      </div>
      <div className='absolute inset-0 w-full h-full bg-[linear-gradient(180deg,rgba(255,255,255,0)_56%,rgba(0,0,0,1)_100%)] z-10' />

      <div className='relative z-10 text-center px-4  mx-auto flex justify-between flex-col mt-10 sm:mt-18 md:mt-24'>
        <h1 className='text-lg sm:text-2xl md:text-[40px] font-[700] text-white mb-4 sm:mb-5 md:mb-6 animate-fade-in-up tracking-wider flex flex-col justify-center relative whitespace-pre'>
          <div className='font-freigeist-light uppercase font-[250] text-[18px] sm:text-[24px] md:text-[32px] lg:text-[36px]'>
            {t("title1")}
          </div>
          <div className='relative font-freigeist-black uppercase font-[850] text-[18px] sm:text-[24px] md:text-[32px] lg:text-[36px]'>
            {t("title")}
          </div>
        </h1>

        {/* <div className='font-[BGMfreigeistLight] text-base sm:text-lg md:text-2xl tracking-wider mt-8 sm:mt-12 md:mt-[16vh]'>
          {t("title2")}
        </div> */}

        <div className='mx-auto mt-8 sm:mt-12 md:mt-[18vh]'>
          <Button variant={"transparent"}>{t("startInvesting")}</Button>
        </div>
      </div>
    </section>
  )
}
