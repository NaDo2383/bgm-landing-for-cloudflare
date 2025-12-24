"use client"
import { useTranslations } from "next-intl"
import React from "react"
import AboutUs from "../sections/AboutUs"
import { useScrollToId } from "@/utils/utils"
import TeamSectionCarousel from "./TeamSectionCarousel"
import MemberCard from "../ui/MemberCard"

const AboutUsPage = () => {
  const t = useTranslations("about-us")
  const scrollTo = useScrollToId()

  const data = [
    {
      title: t("title1small"),
      text: t("text1small"),
    },
    {
      title: t("title2small"),
      text: t("text2small"),
    },
    {
      title: t("title3small"),
      text: t("text3small"),
    },
  ]

  const boardMembers = [
    {
      title: t("boardMemberTitle1"),
      name: t("boardMemberName1"),
      imgUrl: "/membercardimage.png",
    },
    {
      title: t("boardMemberTitle2"),
      name: t("boardMemberName2"),
      imgUrl: "/membercardimage.png",
    },
    {
      title: t("boardMemberTitle3"),
      name: t("boardMemberName3"),
      imgUrl: "/membercardimage.png",
    },
  ]

  return (
    <>
      <section className='w-full bg-[#000]'>
        <section className='relative min-h-[400px] flex items-center justify-center flex-col overflow-hidden'>
          <div className='relative z-10 text-start max-w-[1440px] w-full px-4 sm:px-6 lg:px-[100px] bg-[url("/about-us-hero.png")] bg-no-repeat bg-center bg-contain'>
            <div className='flex flex-col items-center justify-center mt-14 sm:mt-20 md:mt-24'>
              <h2 className='text-[26px] sm:text-[36px] md:text-[62px] leading-tight font-xwide font-bold bg-[linear-gradient(92.65deg,#FFFFFF_17.06%,#999999_99.58%)] bg-clip-text text-transparent text-center mr-1.5 uppercase'>
                {t("title1")}
              </h2>
              <span className='font-norms-pro text-xs sm:text-base md:text-lg text-[#AFAFAF] font-medium mt-2 sm:mt-2.5'>
                {t("whatwedo")}
              </span>
            </div>

            <div className='z-20 mt-6 sm:mt-8 md:mt-14 w-full justify-center flex gap-2.5 sm:gap-4 md:gap-5'>
              <span
                onClick={() => scrollTo("bg-theory")}
                className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#FFFFFF] border-2 border-transparent cursor-pointer [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box] text-xs sm:text-sm md:text-base text-center'>
                {t("BGTheory")}
              </span>

              <span
                onClick={() => scrollTo("asset-mamangement")}
                className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#FFFFFF] border-2 border-transparent cursor-pointer [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box] text-xs sm:text-sm md:text-base text-center'>
                {t("BGMAssetmanagement")}
              </span>

              <span
                onClick={() => scrollTo("team")}
                className='inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[#FFFFFF] border-2 border-transparent cursor-pointer [background:linear-gradient(#0B0B0B,#0B0B0B)_padding-box,linear-gradient(180deg,#4E4E4E_0%,#232323_100%)_border-box] text-xs sm:text-sm md:text-base text-center'>
                {t("Team introduction")}
              </span>
            </div>
          </div>
        </section>

        <AboutUs id='bg-theory' imageColoredBg={true} />

        <section id='asset-mamangement' className='w-full bg-[#000]'>
          <div className='flex flex-col justify-center items-center max-w-7xl mx-auto gap-2 sm:gap-2.5'>
            <div className='text-[28px] sm:text-[36px] md:text-[45px] font-medium font-norms-pro bg-[linear-gradient(92.65deg,#FFFFFF_17.06%,#999999_99.58%)] bg-clip-text text-transparent whitespace-pre text-center'>
              {t("bgm-name")}
            </div>
            <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-[1096px] text-center font-norms-pro text-[#afafaf] text-sm sm:text-base md:text-lg'>
              <div>{t("text1")}</div>
              <div>{t("text2")}</div>
            </div>
          </div>
        </section>

        <section className='relative flex flex-col justify-center items-center max-w-7xl mx-auto gap-8 sm:gap-10 md:gap-12 bg-[url("/bg-about-us.png")] bg-center min-h-[506px] lg:min-w-[1440px] py-2.5 md:py-0'>
          <div className='absolute inset-0 pointer-events-none'></div>

          <div className='flex flex-col lg:flex-row justify-between relative z-10 gap-6 sm:gap-10 md:gap-16 mt-4.5 md:mt-0.5'>
            {data.map((e, i) => (
              <div
                key={i + "fdnjsaikl"}
                className='bg-[url("/about-us-card-bg.png")] bg-cover lg:w-[360px] lg:h-[270px] p-5 sm:p-6 gap-2.5 sm:gap-3.5 flex flex-col text-center items-center justify-start'>
                <div className='text-[24px] sm:text-[32px] md:text-[40px] font-[850] mt-4 sm:mt-6 md:mt-8 uppercase font-freigeist-black'>
                  {e.title}
                </div>
                <div className='font-medium whitespace-pre-wrap font-norms-pro text-sm sm:text-base md:text-lg text-[#AFAFAF]'>
                  {e.text}
                </div>
              </div>
            ))}
          </div>
        </section>
        <TeamSectionCarousel />

        {/* <section className=' max-w-[1240px] mx-auto flex flex-col gap-20 my-52'>
          <div className='flex flex-col gap-2.5 items-center justify-center font-norms-pro'>
            <div className='text-5xl font-medium capitalize'>{t("boardMembers")}</div>
            <div className='text-[#afafaf] text-lg whitespace-pre-wrap text-center'>
              {t("boardMembersText")}
            </div>
          </div>
          <div className='flex justify-center gap-[70px] '>
            {boardMembers.map((e, i) => (
              <MemberCard data={e} key={i} />
            ))}
          </div>
        </section> */}
      </section>
    </>
  )
}

export default AboutUsPage
