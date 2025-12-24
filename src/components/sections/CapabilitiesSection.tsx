"use client"

import { useTranslations } from "next-intl"
import Card from "../ui/Card"
import { ArrowBtn } from "../ui/ArrowBtn"
import Image from "next/image"
import Link from "next/link"
import PopInSection from "../PopInSection"

export default function CapabilitiesSection() {
  const t = useTranslations("capabilities")

  const capabilities = [
    {
      title: t("card1.title"),
      description: t("card1.description"),
      icon: (
        <Image src='/icons/funds-fill.svg' alt='Wealth icon' width={30} height={30} />
      ),
    },
    {
      title: t("card2.title"),
      description: t("card2.description"),
      icon: (
        <Image src='/icons/stock-fill.svg' alt='Wealth icon' width={30} height={30} />
      ),
    },
    {
      title: t("card3.title"),
      description: t("card3.description"),
      icon: (
        <Image
          src='/icons/file-chart-2-fill.svg'
          alt='Wealth icon'
          width={30}
          height={30}
        />
      ),
    },
  ]

  return (
    <PopInSection>
      <section className='bg-[url("/modern-gradiant.png")] bg-no-repeat bg-fill bg-center p-6 sm:p-18 lg:p-[100px] sm:pt-0'>
        <div className='mx-auto max-w-[1240px]  px-2 sm:px-4 flex flex-col gap-8 sm:gap-10 lg:gap-[50px]'>
          {/* Heading */}
          <div className='flex flex-col gap-2 font-norms-pro'>
            <div className='flex flex-wrap items-center justify-center gap-2 text-center font-medium'>
              <h2 className=' text-white text-2xl sm:text-3xl lg:text-[40px] leading-tight'>
                {t("title1")}
              </h2>
              <h2 className=' text-[#E85211] text-2xl sm:text-3xl lg:text-[40px] leading-tight'>
                {t("title2")}
              </h2>
            </div>
            <p className='text-center text-[#AFAFAF] font-normal tracking-normal  text-sm sm:text-base leading-relaxed max-w-4xl mx-auto whitespace-pre-wrap'>
              {t("text")}
            </p>
          </div>

          {/* Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-[50px]'>
            {capabilities.map((cap, i) => (
              <div key={i} className='h-full'>
                <Card {...cap} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className='flex justify-center'>
            <div className='w-full sm:w-auto'>
              <Link href='/asset-management'>
                <ArrowBtn arrow_bg='black' className='w-full sm:w-auto'>
                  {t("seeMore")}
                </ArrowBtn>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PopInSection>
  )
}
