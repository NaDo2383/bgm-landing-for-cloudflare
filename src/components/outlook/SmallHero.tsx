"use client"
import React from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

const SmallHero = ({ year }: { year: string }) => {
  const t = useTranslations("outlook")
  const router = useRouter()

  return (
    <section className='relative min-h-[400px] flex items-center justify-center flex-col overflow-hidden '>
      <div className='absolute inset-0 bg-[url("/about-us-hero.png")] bg-no-repeat  bg-contain bg-center ' />

      <div className='relative z-10 text-start max-w-[1440px] w-full px-4 sm:px-6 lg:px-[100px] '>
        <div className=' flex flex-col items-center justify-center mt-24'>
          <h2 className='text-[40px] md:text-[62px] font-[BGMxwidemedium] bg-[linear-gradient(92.65deg,#FFFFFF_17.06%,#999999_99.58%)] bg-clip-text text-transparent text-center mr-1.5 uppercase font-bold'>
            {t("title1")}
          </h2>
          <span className='font-[norms-pro] text-lg text-[#AFAFAF] whitespace-pre-wrap text-center'>
            {t("title2")}
          </span>
        </div>
        <div className='z-20 mt-14 w-full justify-center flex gap-5'>
          <span
            onClick={() => router.push("/outlook/2024")}
            className={`font-[norms-pro] cursor-pointer font-bold text-[${
              +year == 2024 ? "#fff" : "#E89548"
            }] border border-[#E89548] ${
              +year == 2024 && "bg-[#E89548]"
            } px-5 py-2.5 rounded-full`}>
            2024
          </span>
          <span
            onClick={() => router.push("/outlook/2025")}
            className={`font-[norms-pro] cursor-pointer font-bold text-[${
              +year == 2025 ? "#fff" : "#E89548"
            }] border border-[#E89548] ${
              +year == 2025 && "bg-[#E89548]"
            } px-5 py-2.5 rounded-full`}>
            2025
          </span>
        </div>
      </div>
    </section>
  )
}

export default SmallHero
