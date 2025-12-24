"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { newsType } from "./NewsInsightPage"
import Image from "next/image"
import EmailAlertsSignup from "../sections/ContactUsForm"

const NewsDetailPage = ({ newsId }: { newsId: string }) => {
  const [data, setData] = useState<newsType>()
  const [loading, setLoading] = useState(true)

  const fetchNews = async (): Promise<void> => {
    try {
      setLoading(true)
      const res = await axios.get<newsType>(`/api/news/${newsId}`)
      setData(res.data)
    } catch (error) {
      console.error("Failed to fetch news:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [newsId])

  return (
    <div className=''>
      {data?.imageUrl ? (
        <div className='relative w-full h-[380px]'>
          <Image
            src={data?.imageUrl}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
            priority={false}
            alt='image'
          />
        </div>
      ) : (
        <div
          className={[
            "h-full max-h-[380px] relative overflow-hidden w-full aspect-[4/3] bg-slate-700",
            loading ? "animate-pulse" : "",
          ].join(" ")}></div>
      )}
      {data?.description && (
        <div
          className='max-w-[1150px] mx-auto my-[122px] whitespace-pre-wrap break-words'
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      )}
      <EmailAlertsSignup />
    </div>
  )
}

export default NewsDetailPage
