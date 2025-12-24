import { useTranslations } from "next-intl"
import React from "react"

export default function Benefits() {
  const t = useTranslations("careers")

  const sample = [
    { icon: "ri-diamond-fill", text: t("financial") },
    { icon: "ri-scales-fill", text: t("life-balance") },
    { icon: "ri-percent-fill", text: t("pay-for-perf") },
    { icon: "ri-hand-heart-fill", text: t("h&p-well-being") },
    { icon: "ri-mental-health-fill", text: t("mental-well-being") },
  ]

  return (
    <section
      id='benefits'
      className='max-w-7xl mx-auto flex flex-col items-center justify-center my-12 sm:my-16 md:my-20 gap-10 sm:gap-14 md:gap-16 px-4 sm:px-6'>
      <div className='font-norms-pro text-center'>
        <div className='font-medium text-3xl sm:text-4xl md:text-5xl bg-[linear-gradient(92.65deg,#FFFFFF,#AAAAAA)] bg-clip-text text-transparent'>
          {t("benefits")}
        </div>
        <div className='font-[450] text-sm sm:text-base md:text-lg text-[#afafaf] whitespace-pre-wrap mt-2.5 sm:mt-3 md:mt-3.5'>
          {t("benefits-text")}
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-7 font-norms-pro'>
        {sample.map((e, i) => (
          <div
            key={i}
            className='
              flex items-center gap-2.5 sm:gap-3.5
              h-[64px] sm:h-[74px] md:h-[84px]
              w-auto rounded-[22px] sm:rounded-[26px] md:rounded-[30px]
              bg-[radial-gradient(100%_272.26%_at_0%_0%,#4E4E4E_0%,#111111_28.6%,#111111_100%)]
              border border-[#4E4E4E]
              py-2.5 sm:py-3 md:py-3.5
              px-4 sm:px-5
            '>
            <div className='size-10 sm:size-[48px] md:size-[56px] flex justify-center items-center bg-[linear-gradient(135deg,#4E4E4E_0%,#050505_51.52%,#050505_100%)] rounded-full border border-[#535353]'>
              <i
                className={`
                  ${e.icon}
                  text-2xl sm:text-[26px] md:text-3xl leading-none
                  text-transparent bg-clip-text
                  bg-[linear-gradient(180deg,#FFBD80_0%,#E46F03_100%)]
                `}
                aria-hidden='true'
              />
            </div>
            <div className='font-norms-pro font-semibold text-white text-base sm:text-lg md:text-2xl'>
              {e.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
