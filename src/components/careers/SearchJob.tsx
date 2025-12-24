import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function SearchJob() {
  const t = useTranslations("careers")

  return (
    <div className='max-w-7xl mx-auto font-norms-pro flex flex-col items-center lg:flex-row justify-center lg:justify-between my-12 sm:my-16 md:my-20 gap-10 sm:gap-14 md:gap-16 px-4 sm:px-6'>
      <div className='flex flex-col gap-12 justify-start '>
        <div>
          <div className='font-medium text-3xl sm:text-4xl md:text-5xl bg-[linear-gradient(92.65deg,#FFFFFF,#AAAAAA)] bg-clip-text text-transparent'>
            {t("search-job")}
          </div>
          <div className='font-[450] text-xs sm:text-sm md:text-lg whitespace-pre text-[#AFAFAF] mt-3.5'>
            {t("search-job-text")}
          </div>
        </div>
        <Link href={"/careers/search-job"} className='w-fit'>
          <div className='py-2 sm:py-2.5 px-10 sm:px-16 cursor-pointer text-white rounded-[15px] w-fit mx-auto bg-[radial-gradient(52.44%_127.23%_at_0%_0%,_#FFBD80_0%,#E46F03_77.25%)] text-sm sm:text-base'>
            {t("apply-now")}
          </div>
        </Link>
      </div>
      <div className='relative w-full max-w-[715px] aspect-[715/401] shrink-0 '>
        <Image
          src='/search-job-img.png'
          alt='many people crossing the road'
          fill
          className='object-contain '
          sizes='(max-width: 768px) 100vw, 715px'
        />
      </div>
    </div>
  )
}
