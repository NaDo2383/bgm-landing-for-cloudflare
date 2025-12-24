"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { motion } from "framer-motion"
import Image from "next/image"

import ContactUsForm from "@/components/sections/ContactUsForm"
import NewsCard from "@/components/ui/NewsCard"
import NewsletterList from "./NewsletterList"
import LatestNewsPanel from "./LatestNewsPanel"
import SmallHero from "./SmallHero"
import axios from "axios"
import { HeroNewsCardSkeleton, NewsCardSkeleton } from "./HeroNewsCardSkeleton"

export interface newsType {
  createdAt: any
  description: string
  id: string
  imageUrl?: string
  title: string
}

const NewsInsightPage = () => {
  const [news, setNews] = useState<newsType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await axios.get<{ items: newsType[] }>(`/api/news`)
      setNews(res.data.items)
    } catch (error) {
      console.error("Failed to fetch news:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <>
      <SmallHero />
      <section id='news' className='bg-[#000] py-10 px-6 md:px-12 md:p-[100px]'>
        <div className='max-w-[1280px] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-[50px]'>
            {loading ? (
              <>
                <HeroNewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </>
            ) : (
              news.slice(0, 4).map((news, index) => {
                if (index === 0)
                  return (
                    <Link
                      href={`/news-Insight/${news.id}`}
                      key={news.id}
                      className='group block h-full md:max-h-[380px] focus:outline-none md:col-span-3'>
                      <motion.article
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className={clsx(
                          "h-full rounded-[30px] p-3 sm:p-4 md:p-5",
                          "bg-[linear-gradient(#171717,#111111)] border border-[#434343]",
                          "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
                          "flex flex-col md:flex-row gap-3 md:gap-4"
                        )}>
                        {/* Image */}
                        <div
                          className={clsx(
                            "relative overflow-hidden rounded-[15px]",
                            "w-full md:w-1/2",
                            "aspect-[16/9] sm:aspect-[4/3]" // мобайлд арай өндөр, ≥sm 4:3
                          )}>
                          {news.imageUrl ? (
                            <Image
                              src={news.imageUrl}
                              alt={news.title}
                              fill
                              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                              className='object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]'
                              priority={false}
                            />
                          ) : (
                            <div className='absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800' />
                          )}
                          <div className='pointer-events-none absolute inset-0 rounded-[15px] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]' />
                        </div>

                        {/* Text */}
                        <div className='w-full md:w-1/2 font-norms-pro flex flex-col justify-between py-6'>
                          <h3 className='mt-3 md:mt-0 text-white leading-tight font-bold text-[18px] sm:text-[24px] md:text-[36px] line-clamp-3'>
                            {news.title}
                          </h3>
                          <p
                            className='mt-2 text-white/70 text-[13px] sm:text-sm md:text-[15px] leading-5 sm:leading-6 line-clamp-4 sm:line-clamp-5 md:line-clamp-7 font-[450]'
                            dangerouslySetInnerHTML={{ __html: news.description }}
                          />
                        </div>
                      </motion.article>
                    </Link>
                  )

                return <NewsCard key={news.id} {...news} />
              })
            )}
          </div>
        </div>
      </section>

      <section
        id='outlook'
        className='bg-[#121212] min-h-[520px] md:min-h-[756px] py-12 sm:py-16 md:py-24'>
        <div className='max-w-[1280px] mx-auto w-full flex flex-col md:flex-row gap-6 sm:gap-7 md:gap-8 px-4 sm:px-6 md:px-0'>
          {/* Зурагтай блок */}
          <div className='w-full md:w-3/5 aspect-[16/9] sm:aspect-[3/2] md:aspect-[4/3] bg-[linear-gradient(#262626,#111111,#262626)] rounded-[18px] sm:rounded-[22px] md:rounded-[25px] p-4 sm:p-6 md:p-7'>
            <div className='rounded-[12px] sm:rounded-[14px] md:rounded-[15px] overflow-hidden relative w-full aspect-[16/9] sm:aspect-[3/2] md:aspect-[4/3]'>
              <Image
                src={"/outlook-sample.png"}
                alt={"outlook image"}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]'
                priority={false}
              />
            </div>
          </div>

          {/* Текст тал */}
          <div className='flex-1 flex flex-col justify-between px-1 sm:px-0'>
            <div className='mt-6 sm:mt-10 md:mt-16 flex flex-col gap-4 sm:gap-5 md:gap-6'>
              <div className='text-2xl sm:text-3xl md:text-4xl uppercase text-white whitespace-pre font-benzin-bold leading-tight'>
                {"2025 September \n& FUTURE"}
              </div>
              <div className='font-norms-pro underline text-base sm:text-xl md:text-2xl font-[450] text-white/90'>
                Global Outlook 09/2025
              </div>
            </div>

            <div className='flex flex-wrap gap-2.5 sm:gap-3.5 md:gap-3.5 font-norms-pro font-semibold mt-6 sm:mt-10 md:mt-0 mb-10 sm:mb-14 md:mb-20'>
              <Link href={"/outlook/2024"}>
                <div className='px-4 sm:px-5 py-2 sm:py-2.5 rounded-[12px] sm:rounded-[15px] border border-[#E89548] cursor-pointer text-sm sm:text-base'>
                  2024 Global Outlook
                </div>
              </Link>
              <Link href={"/outlook/2025"}>
                <div className='px-4 sm:px-5 py-2 sm:py-2.5 rounded-[12px] sm:rounded-[15px] border border-[#E89548] cursor-pointer bg-[linear-gradient(#E89548,#E87811)] text-sm sm:text-base'>
                  2025 Global Outlook
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id='news-letter'
        className='mx-auto max-w-[1112px] px-4 sm:px-6 md:px-0 py-8 sm:py-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6'>
          {loading ? (
            <>
              <div className='space-y-3 sm:space-y-4'>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className='h-20 sm:h-24 bg-slate-700/70 rounded-lg animate-pulse'
                  />
                ))}
              </div>
              <div className='h-[520px] sm:h-[640px] md:h-[760px] bg-slate-700/70 rounded-lg animate-pulse' />
            </>
          ) : (
            <>
              <NewsletterList items={news.slice(0, 4)} />
              <LatestNewsPanel
                items={news}
                className='lg:ml-0 xl:ml-2'
                maxHeight={760} // desktop хэвээр
              />
            </>
          )}
        </div>
      </section>

      <ContactUsForm />
    </>
  )
}

export default NewsInsightPage
