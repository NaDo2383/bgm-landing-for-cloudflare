"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import PopInSection from "../PopInSection"

type aboutUsPropsType = {
  bgcolor?: string
  imageColoredBg?: boolean
  id?: string
}

const AboutUs = ({ bgcolor = "#000000", id, imageColoredBg }: aboutUsPropsType) => {
  const t = useTranslations("aboutCard")

  return (
    <PopInSection>
      <section
        id={id}
        className={`bg-[${bgcolor}] overflow-hidden py-10 sm:py-14 lg:py-[64px] px-4 sm:px-6`}
        style={{ backgroundColor: bgcolor }} //
      >
        <div
          className='
            mx-auto max-w-[1240px]
            w-full
            flex flex-col md:flex-row items-center
            gap-6 sm:gap-10 lg:gap-[74px]
            rounded-xl overflow-hidden shadow-xl
          '>
          {/* Image */}
          <div
            className='
              relative w-full md:w-[460px]
              aspect-[4/3] xs:aspect-[3/2] sm:aspect-[16/10]
              md:h-[544px] md:aspect-auto md:min-h-[420px] lg:min-h-[506px] max-h-[544px]
              flex justify-center items-center
            '>
            <Image
              src={
                imageColoredBg
                  ? "/about-us-card-image-colored.png"
                  : "/about-us-card-image.png"
              }
              alt='About us'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-contain'
              priority={false}
            />
          </div>

          {/* Content */}
          <div
            className='
              w-full md:w-2/3 max-w-[645px]
              py-4 sm:py-6 lg:py-[50px]
              flex flex-col justify-between
              gap-5 sm:gap-6
            '>
            <div className='flex flex-col gap-3'>
              <div
                className='
                  flex flex-wrap items-center justify-center md:justify-start
                  gap-1.5 sm:gap-2
                  text-center md:text-left
                  font-medium font-norms-pro
                '>
                <h2 className='text-white text-xl sm:text-2xl lg:text-[40px] leading-tight'>
                  {t("title")}
                </h2>
                <span className='text-[#E85211] text-xl sm:text-2xl lg:text-[40px] leading-tight'>
                  {t("title1")}
                </span>
                <h2 className='text-white text-xl sm:text-2xl lg:text-[40px] leading-tight'>
                  ?
                </h2>
              </div>

              <div className='text-[15px] sm:text-base lg:text-[18px]  font-[450] font-norms-pro text-[#AFAFAF] leading-5'>
                <div>{t("text")}</div>
                <br />
                <div>{t("text1")}</div>
                <br />
                <div>{t("text2")}</div>
                <br />
                <p className='text-white font-norms-pro capitalize text-sm sm:text-base lg:text-[18px]'>
                  {t("cardText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PopInSection>
  )
}

export default AboutUs
