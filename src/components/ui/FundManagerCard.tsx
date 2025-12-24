import Image from "next/image"
import React from "react"

interface dataType {
  title: string
  name: string
  imgUrl?: string
  number?: string
  mail?: string
}

interface FundManagerCardPropType {
  data: dataType
}

export default function FundManagerCard({ data }: FundManagerCardPropType) {
  return (
    <div className='flex flex-col gap-[22px] font-norms-pro '>
      <Image
        src={data.imgUrl ? data.imgUrl : "/FundManagerCardimage.png"}
        alt={data.name + " image"}
        width={276}
        height={346}
        className='rounded-[30px]'
      />
      <div className='flex flex-col gap-5 items-center justify-center'>
        <div className='text-2xl font-semibold capitalize'>{data.name}</div>
        <div className='flex flex-col gap-[5px] items-center'>
          <div className='text-[17px] font-medium capitalize text-[#919191]'>
            {data.title}
          </div>
          <div className='text-[17px] font-medium capitalize text-[#919191]'>
            {data.number}
          </div>
          <div className='text-[17px] font-medium text-[#919191]'>{data.mail}</div>
        </div>
      </div>
    </div>
  )
}
