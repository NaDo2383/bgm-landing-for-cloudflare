import { useTranslations } from "next-intl"
import React from "react"

export default function LifeAtBGM() {
  const t = useTranslations("careers")

  const sample = [
    {
      icon: "ri-target-line",
      title: t("purpose-culture"),
      text: t("purpose-culture-text"),
    },
    {
      icon: "ri-numbers-fill",
      title: t("order-culture"),
      text: t("order-culture-text"),
    },
    {
      icon: "ri-speak-ai-fill",
      title: t("v-of-emp"),
      text: t("v-of-emp-text"),
    },
  ]

  return (
    <section
      id='life-at-bgm'
      className='max-w-7xl mx-auto flex flex-col items-center justify-center my-12 sm:my-16 md:my-20 gap-10 sm:gap-14 md:gap-16 px-4 sm:px-6'>
      <div className='font-norms-pro text-center'>
        <div className='font-medium text-3xl sm:text-4xl md:text-5xl bg-[linear-gradient(92.65deg,#FFFFFF,#AAAAAA)] bg-clip-text text-transparent'>
          {t("life-at-bgm")}
        </div>
        <div className='font-[450] text-sm sm:text-base md:text-lg text-[#afafaf] whitespace-pre-wrap mt-2.5 sm:mt-3 md:mt-3.5'>
          {t("life-at-bgm-text")}
        </div>
      </div>

      {/* Cards row (DOM бүтэц өөрчлөхгүй, зөвхөн responsive классууд) */}
      <div className='flex w-full flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-center sm:justify-between gap-6 sm:gap-7 md:gap-8 font-norms-pro'>
        {sample.map((e, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center text-center gap-2.5
              bg-[url('/career-card-bg.png')] bg-cover bg-center
              w-full sm:w-[340px] md:w-[390px]
              min-h-[320px] md:h-[400px]
              rounded-[24px] md:rounded-[30px]
              border border-[#4E4E4E]
              pt-6 sm:pt-7 px-5 sm:px-6
              mx-auto
            ">
            <div className='font-semibold text-2xl sm:text-[26px] md:text-[30px]'>
              {e.title}
            </div>

            <div
              className="
                bg-[url('/career-card-bg.gif')] bg-center bg-auto z-10
                rounded-[20px] md:rounded-[25px]
                w-full max-w-[331px]
                h-[130px] sm:h-[145px] md:h-[153px]
                flex justify-center items-center
              ">
              <div className='size-[72px] sm:size-[84px] md:size-[90px] flex justify-center items-center bg-[linear-gradient(#FFBD80,#E46F03,#E46F03)] rounded-full'>
                <i
                  className={`${e.icon} text-white text-4xl md:text-5xl leading-none`}
                  aria-hidden='true'
                />
              </div>
            </div>

            <div className='font-[450] text-[#afafaf] text-sm sm:text-base md:text-[18px] whitespace-pre-wrap leading-snug px-1'>
              {e.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
