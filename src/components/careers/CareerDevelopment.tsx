import { useTranslations } from "next-intl"
import React from "react"
import ClientLogos from "../sections/ClientLogos"

export default function CareerDevelopment() {
  const t = useTranslations("careers")

  return (
    <section
      id='career-developments'
      className='max-w-7xl mx-auto flex flex-col items-center justify-center my-12 sm:my-16 md:my-20 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6'>
      <div className='font-norms-pro text-center'>
        <div className='font-medium text-3xl sm:text-4xl md:text-5xl bg-[linear-gradient(92.65deg,#FFFFFF,#AAAAAA)] bg-clip-text text-transparent'>
          {t("career-developments")}
        </div>
        <div className='font-[450] text-sm sm:text-base md:text-lg text-[#afafaf] whitespace-pre-wrap mt-2.5 sm:mt-3 md:mt-3.5'>
          {t("career-developments-text")}
        </div>
      </div>

      <div className='bg-[linear-gradient(180deg,#4E4E4E_0%,#232323_100%)] p-[1px] rounded-full mt-6 sm:mt-7 md:mt-8'>
        <div className='font-norms-pro font-medium text-sm sm:text-base lg:text-lg px-5 sm:px-6 md:px-[25px] py-2.5 sm:py-3 md:py-[15px]  bg-[linear-gradient(180deg,#050505_0%,#252525_100%)] rounded-full text-[#FFFFFF]'>
          {t("pro-network")}
        </div>
      </div>

      <ClientLogos className='py-2.5 sm:py-4 lg:py-5' />
    </section>
  )
}
