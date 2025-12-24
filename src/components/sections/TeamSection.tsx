"use client"

import { useTranslations } from "next-intl"
import { ArrowBtn } from "../ui/ArrowBtn"

interface TeamMember {
  image: string
}

export default function TeamSection() {
  const t = useTranslations("team")

  const team: TeamMember[] = [
    { image: "/tuz1.png" },
    { image: "/tuz2.png" },
    { image: "/tuz3.png" },
    { image: "/tuz4.png" },
    { image: "/tuz5.png" },
  ]

  return (
    <section className='bg-[#020618] p-6 sm:p-10 lg:p-[100px]'>
      <div className='mx-auto max-w-7xl flex flex-col gap-6 sm:gap-8 lg:gap-[50px]'>
        {/* Heading */}
        <div className='flex flex-wrap items-center justify-center gap-2 text-center'>
          <h2 className='font-roboto text-[#E85211] text-2xl sm:text-3xl lg:text-[40px] leading-tight'>
            {t("title1")}
          </h2>
          <h2 className='font-roboto text-white text-2xl sm:text-3xl lg:text-[40px] leading-tight'>
            {t("title2")}
          </h2>
        </div>

        {/* Grid — desktop keeps original px and height */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-6 lg:px-[130px] lg:h-[406px]  '>
          {team.map((member, index) => {
            const desktopAlign = index % 2 === 0 ? "lg:items-end" : "lg:items-start"
            return (
              <div
                key={index}
                className={`group relative flex items-center justify-center ${desktopAlign}`}>
                <img
                  src={member.image}
                  alt={`Team member ${index + 1}`}
                  loading='lazy'
                  decoding='async'
                  className=' w-24 sm:w-28 lg:w-[156px] h-auto object-contain md:grayscale group-hover:grayscale hover:grayscale-0 transition duration-300 '
                />
              </div>
            )
          })}
        </div>

        <p className='text-center text-[#90A1B9] text-sm sm:text-base'>{t("subtitle")}</p>

        <div className='flex justify-center'>
          <div className='w-full sm:w-auto'>
            <ArrowBtn
              arrow_bg='black'
              onClick={() => alert("Go!")}
              className='w-full sm:w-auto'>
              {t("seeMore")}
            </ArrowBtn>
          </div>
        </div>
      </div>
    </section>
  )
}
