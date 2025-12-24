"use client"

import { FC, ButtonHTMLAttributes } from "react"
import { ArrowRight } from "lucide-react"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  arrow_bg?: "white" | "black"
  children: React.ReactNode
}

export const ArrowBtn: FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-[linear-gradient(130deg,rgba(255,255,255,1)_6%,#212227_18%,#212227_82%,rgba(255,255,255,1)_94%)] rounded-[24px]`}>
      <div className='flex items-center justify-center gap-5 h-12 rounded-[24px] pl-[20px] pr-[5px] py-[5px]  cursor-pointer bg-[#212227] m-[1px]'>
        <span className={`text-base font-normal capitalize text-[#FFFFFF]`}>
          {children}
        </span>
        <div
          className={`
          flex items-center justify-center
          w-[38px] h-[38px]
          rounded-full
          bg-[#626368]
          `}>
          <ArrowRight className={`w-4 h-4 text-white `} />
        </div>
      </div>
    </button>
  )
}
