"use client"
import { useTranslations } from "next-intl"
import React from "react"
import Benefits from "./Benefits"
import StudentsGraduates from "./StudentsGraduates"
import CareerDevelopment from "./CareerDevelopment"
import SocialCampaign from "./SocialCampaign"
import LifeAtBGM from "./LifeAtBGM"
import { useScrollToId } from "@/utils/utils"
import SearchJob from "./SearchJob"

export default function CareersPage() {
  const t = useTranslations("careers")
  const scrollTo = useScrollToId()

  return (
    <>
      <section className='relative min-h-[400px] flex items-center justify-center flex-col overflow-hidden '>
        <div className='relative z-10 text-start max-w-[1440px] w-full px-4 sm:px-6 lg:px-[100px] bg-[url("/about-us-hero.png")] bg-no-repeat  bg-contain bg-center'>
          <div className='flex flex-col items-center justify-center mt-16 sm:mt-20 md:mt-24'>
            <h2 className='text-[28px] sm:text-[36px] md:text-[62px] font-xwide bg-[linear-gradient(92.65deg,#FFFFFF_17.06%,#999999_99.58%)] bg-clip-text text-transparent text-center mr-1.5 uppercase font-bold leading-tight'>
              {t("title1")}
            </h2>
            <span className='font-norms-pro text-sm sm:text-base md:text-lg text-[#AFAFAF] font-[450] whitespace-pre-wrap text-center mt-2'>
              {t("title2")}
            </span>
          </div>

          <div className='z-20 mt-6 sm:mt-8 md:mt-14 w-full justify-center flex flex-wrap gap-2.5 sm:gap-3.5 md:gap-5'>
            <span
              onClick={() => scrollTo("life-at-bgm")}
              className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#fff]
                   border-2 border-transparent cursor-pointer
                   [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box]
                   text-xs sm:text-sm md:text-base'>
              {t("life-at-bgm")}
            </span>
            <span
              onClick={() => scrollTo("benefits")}
              className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#fff]
                   border-2 border-transparent cursor-pointer
                   [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box]
                   text-xs sm:text-sm md:text-base'>
              {t("benefits")}
            </span>
            <span
              onClick={() => scrollTo("students-and-graduates")}
              className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#fff]
                   border-2 border-transparent cursor-pointer
                   [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box]
                   text-xs sm:text-sm md:text-base'>
              {t("students-and-graduates")}
            </span>
            <span
              onClick={() => scrollTo("career-developments")}
              className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#fff]
                   border-2 border-transparent cursor-pointer
                   [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box]
                   text-xs sm:text-sm md:text-base'>
              {t("career-developments")}
            </span>
            <span
              onClick={() => scrollTo("social-campaign")}
              className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#fff]
                   border-2 border-transparent cursor-pointer
                   [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box]
                   text-xs sm:text-sm md:text-base'>
              {t("social-campaign")}
            </span>
          </div>
        </div>
      </section>

      <LifeAtBGM />
      <Benefits />
      <StudentsGraduates />
      <CareerDevelopment />
      <SocialCampaign />
      <SearchJob />
    </>
  )
}
