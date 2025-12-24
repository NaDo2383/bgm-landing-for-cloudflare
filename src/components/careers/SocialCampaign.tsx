import { useTranslations } from "next-intl"
import Image from "next/image"
import React from "react"

export default function SocialCampaign() {
  const t = useTranslations("careers")

  const sample = [
    { title: t("health"), path: "/social-campaign-pic-1.png", text: t("health-text") },
    { title: t("edu"), path: "/social-campaign-pic-2.png", text: t("edu-text") },
    { title: t("env"), path: "/social-campaign-pic-3.png", text: t("env-text") },
  ]

  return (
    <section
      id='social-campaign'
      className='max-w-7xl mx-auto flex flex-col items-center justify-center my-12 sm:my-16 md:my-20 pb-12 sm:pb-16 md:pb-24 gap-10 sm:gap-14 md:gap-16 px-4 sm:px-6'>
      <div className='font-norms-pro text-center'>
        <div className='font-medium text-3xl sm:text-4xl md:text-5xl bg-[linear-gradient(92.65deg,#FFFFFF,#AAAAAA)] bg-clip-text text-transparent'>
          {t("social-campaign")}
        </div>
        <div className='font-[450] text-sm sm:text-base md:text-lg text-[#afafaf] whitespace-pre-wrap mt-2.5 sm:mt-3 md:mt-3.5'>
          {t("social-campaign-text")}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 lg:gap-7 font-norms-pro'>
        {sample.map((e, i) => (
          <div
            key={i}
            className='
              flex flex-col items-center text-center gap-2.5
              w-full sm:w-[340px] md:w-[390px]
              min-h-[320px] sm:min-h-[360px] md:h-[400px]
              rounded-[24px] md:rounded-[30px]
              border border-[#4E4E4E]
              py-5 sm:py-7 md:py-[33px]
              px-5 sm:px-6 md:px-[25px]
              bg-[radial-gradient(at_center_top,#272727_0%,#111111_100%)]
              mx-auto
            '>
            <div className='relative w-full max-w-[331px] h-[140px] sm:h-[156px] md:h-[168px] shrink-0 rounded-[16px] md:rounded-[20px] border border-[#4E4E4E] overflow-hidden'>
              <Image
                src={e.path}
                fill
                sizes='(max-width: 640px) 100vw, 331px'
                className='object-cover'
                priority={false}
                alt='image'
              />
            </div>

            <div className='font-medium text-2xl sm:text-[26px] md:text-[30px]'>
              {e.title}
            </div>

            <div className='font-[450] text-sm sm:text-base md:text-lg text-[#afafaf] whitespace-pre-wrap text-center'>
              {e.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
