"use client"
import React, { useEffect, useState } from "react"
import SmallHero from "./SmallHero"
import OutLookCard from "./OutlookCard"
import axios from "axios"

export interface OutlookItem {
  title: string
  path: string
  id: string
  year: number
}

export default function OutlookPage({ year }: { year: string }) {
  const [outlooks, setOutlooks] = useState<OutlookItem[]>([])

  const fetchOutlooks = async (): Promise<void> => {
    const res = await axios.get<OutlookItem[]>(`/api/outlook?year=${year}`)
    setOutlooks(res.data)
  }

  useEffect(() => {
    fetchOutlooks()
  }, [year])

  return (
    <>
      <SmallHero year={year} />
      <div className='grid grid-cols-3 mx-auto max-w-7xl gap-y-16 my-16'>
        {outlooks.map((e, i) => (
          <OutLookCard data={e} key={i} />
        ))}
      </div>
    </>
  )
}
