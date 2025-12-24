import clsx from "clsx"
import React from "react"

export function HeroNewsCardSkeleton() {
  return (
    <div className='group  h-full max-h-[380px] focus:outline-none md:col-span-3 hidden lg:block'>
      <div
        className={clsx(
          "h-full rounded-[30px] p-3 md:p-4 animate-pulse",
          "bg-[linear-gradient(#171717,#111111)] border border-[#434343]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
          "flex flex-col md:flex-row md:gap-4"
        )}>
        {/* Image Skeleton */}
        <div className='relative overflow-hidden w-1/2 rounded-[15px] aspect-[4/3] bg-slate-700' />

        {/* Text Skeleton */}
        <div className='w-1/2 font-norms-pro sm:flex sm:flex-col sm:justify-evenly space-y-4'>
          <div className='mt-4 space-y-3'>
            <div className='h-8 bg-slate-700 rounded w-3/4'></div>
            <div className='h-8 bg-slate-700 rounded w-full'></div>
          </div>
          <div className='mt-2 space-y-2'>
            <div className='h-4 bg-slate-700/60 rounded w-full'></div>
            <div className='h-4 bg-slate-700/60 rounded w-full'></div>
            <div className='h-4 bg-slate-700/60 rounded w-2/3'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const NewsCardSkeleton = () => (
  <div className='group block h-full focus:outline-none'>
    <div
      className={clsx(
        "h-full rounded-[30px] p-3 md:p-4 animate-pulse",
        "bg-[linear-gradient(#171717,#111111)] border border-[#434343]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        "flex flex-col"
      )}>
      {/* Image Skeleton */}
      <div className='relative overflow-hidden rounded-[15px] aspect-[4/3] bg-slate-700' />

      {/* Text Skeleton */}
      <div className='mt-4 space-y-3'>
        <div className='h-6 bg-slate-700 rounded w-full'></div>
        <div className='h-6 bg-slate-700 rounded w-4/5'></div>
        <div className='h-4 bg-slate-700/60 rounded w-full mt-2'></div>
        <div className='h-4 bg-slate-700/60 rounded w-3/4'></div>
      </div>
    </div>
  </div>
)
