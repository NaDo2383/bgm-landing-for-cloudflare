"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

type CardProps = {
  title: string
  description: string

  icon?: ReactNode // url or custom node
  className?: string
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={
        "transition-all duration-300 w-full h-[363px] bg-[url('/landing-card-bg.png')] bg-cover bg-center rounded-[30px] border border-[#434343]"
      }>
      {/* Content */}
      <div className='relative z-10 flex h-full flex-col gap-3 p-6'>
        {/* Icon pill */}
        {icon !== undefined && (
          <div className='h-15 w-15 items-center justify-center flex rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,1)_20%,#282f41_40%,#282f41_60%,rgba(255,255,255,1)_80%)] border-none'>
            <div className=' inline-flex h-full w-full m-[1px] items-center justify-center rounded-2xl bg-[#262626]  border-none'>
              {icon}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className='text-[24px] text-white font-[850px] font-freigeist-black'>
          {title}
        </h3>

        {/* Description */}
        <p className='mt-1 text-lg font-norms-pro leading-6 text-[#afafaf] line-clamp-6 whitespace-pre-wrap capitalize'>
          {description}
        </p>

        <div className='flex-1' />
      </div>
    </motion.div>
  )
}
