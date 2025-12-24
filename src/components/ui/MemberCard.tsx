import Image from "next/image"
import React from "react"

interface dataType {
  title: string
  name: string
  imgUrl?: string
  number?: string
  mail?: string
}

interface MemberCardPropType {
  data: dataType
}

export default function MemberCard({ data }: MemberCardPropType) {
  return (
    <div className='flex flex-col gap-10 font-norms-pro '>
      <Image
        src={data.imgUrl ? data.imgUrl : "/membercardimage.png"}
        alt={data.name + " image"}
        width={331}
        height={390}
        className=' rounded-[30px]'
      />
      <div className='flex flex-col gap-2.5 items-center justify-center'>
        <div className='text-2xl font-semibold capitalize'>{data.name}</div>
        <div className='text-lg font-medium capitalize text-[#919191]'>{data.title}</div>
      </div>
    </div>
  )
}
