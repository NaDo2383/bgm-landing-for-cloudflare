import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function StudentsGraduates() {
  const t = useTranslations("careers")

  const sample = [
    {
      name: t("career-journey"),
      path: "/careers-pic-2.png",
      text: t("career-journey-text"),
    },
    { name: t("early-bird"), path: "/careers-pic-1.png", text: t("early-bird-text") },
  ]

  return (
    <section
      id='students-and-graduates'
      className="max-w-7xl mx-auto flex flex-col items-center justify-center my-12 sm:my-16 md:my-20 pb-12 sm:pb-16 md:pb-24 gap-10 sm:gap-14 md:gap-16 bg-[url('/student-section-bg.png')] bg-cover bg-center px-4 sm:px-6">
      <div className='font-norms-pro text-center'>
        <div className='font-medium text-3xl sm:text-4xl md:text-5xl bg-[linear-gradient(92.65deg,#FFFFFF,#AAAAAA)] bg-clip-text text-transparent'>
          {t("students-and-graduates")}
        </div>
        <div className='font-[450] text-sm sm:text-base md:text-lg text-[#afafaf] whitespace-pre-wrap mt-2.5 sm:mt-3 md:mt-3.5'>
          {t("students-and-graduates-text")}
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-center gap-5 lg:gap-7 font-norms-pro'>
        {sample.map((e, i) => (
          <div
            key={i}
            className='
              w-full sm:w-[520px] md:w-[597px]
              border border-[#9D7960]
              bg-[radial-gradient(at_center_top,#272727_0%,#111111_100%)]
              min-h-[520px] sm:min-h-[600px] md:h-[666px]
              flex flex-col gap-5 sm:gap-6 md:gap-7
              py-5 sm:py-6 md:py-[33px]
              px-5 sm:px-7 md:px-[44px]
              rounded-[22px] sm:rounded-[26px] md:rounded-[30px]
              font-norms-pro
              mx-auto
            '>
            <div className='text-center font-semibold text-2xl sm:text-[26px] md:text-[30px]'>
              {e.name}
            </div>

            <div className='relative w-full max-w-[509px] h-[220px] sm:h-[260px] md:h-[290px] rounded-[20px] md:rounded-[25px] border border-[#4E4E4E] overflow-hidden mx-auto'>
              {/* Таны Image props-ийг өөрчлөхгүй, зөвхөн контейнерийн хэмжээ responsive */}
              <Image src={e.path} layout='fill' objectFit='cover' alt='image' />
            </div>

            <div className='font-[450] text-base sm:text-lg text-[#afafaf] whitespace-pre-wrap text-center'>
              {e.text}
            </div>

            <Link href={"/careers/search-job"} className='mx-auto'>
              <div className='py-2 sm:py-2.5 px-6 sm:px-7.5 cursor-pointer text-white rounded-full w-fit mx-auto bg-[radial-gradient(52.44%_127.23%_at_0%_0%,_#FFBD80_0%,#E46F03_77.25%)] text-sm sm:text-base'>
                {t("apply-now")}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
