"use client"

import { Phone, Mail } from "lucide-react"
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { FaMapMarkerAlt } from "react-icons/fa"
import Image from "next/image"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <div className=' font-norms-pro text-white border-t border-[#434343]  '>
      <div
        className={`mx-auto bg-[url("/footer-gradiant.png")] bg-cover bg-center max-w-[1440px]`}>
        <footer className='relative text-white pt-10 sm:pt-12 lg:pt-16 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 md:px-12 overflow-hidden  '>
          {/* Main Content */}
          <div className='relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-12'>
            {/* Left Column */}
            <div className='flex flex-col md:justify-between md:max-w-[190px]'>
              <Image
                src={"/bgm_logo.png"}
                alt='Logo'
                width={188}
                height={40}
                className='w-[150px] sm:w-[170px] md:w-[188px] h-auto'
              />

              {/* Social Icons */}
              <div className='flex gap-2.5 sm:gap-3 mt-4'>
                {[FaFacebookF, FaInstagram, FaXTwitter].map((Icon, i) => (
                  <div
                    key={i}
                    className='w-9 h-9 sm:w-[42px] sm:h-[42px] md:w-[50px] md:h-[50px] rounded-full bg-[linear-gradient(180deg,#FFBD80_0%,#E46F03_50.48%,#E46F03_100%)] flex items-center justify-center hover:scale-110 transition'>
                    <Icon size={16} className='sm:hidden' />
                    <Icon size={18} className='hidden sm:inline md:hidden' />
                    <Icon size={20} className='hidden md:inline' />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Columns */}
            <div className='w-full max-w-[820px]'>
              {/* Mobile: stack, ≥sm: 3 col grid, ≥md: row with gaps */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-[60px]'>
                <div className='flex flex-col gap-3 sm:gap-4'>
                  <div className='font-bold text-xs sm:text-sm font-inter text-white/90'>
                    {t("links")}
                  </div>
                  <button className='text-sm sm:text-base text-white/80 text-left hover:text-white transition'>
                    {t("terms-of-service")}
                  </button>
                  <button className='text-sm sm:text-base text-white/80 text-left hover:text-white transition'>
                    {t("privacy-policy")}
                  </button>
                </div>

                <div className='flex flex-col gap-3 sm:gap-4'>
                  <div className='font-bold text-xs sm:text-sm font-inter text-white/90'>
                    {t("pages")}
                  </div>
                  <Link
                    href={"/about-us"}
                    className='text-sm sm:text-base text-white/80 hover:text-white transition'>
                    {t("about-us")}
                  </Link>
                  <Link
                    href={"/asset-management"}
                    className='text-sm sm:text-base text-white/80 hover:text-white transition'>
                    {t("asset-management")}
                  </Link>
                  <Link
                    href={"/careers"}
                    className='text-sm sm:text-base text-white/80 hover:text-white transition'>
                    {t("career")}
                  </Link>
                  <Link
                    href='/news-Insight'
                    className='text-sm sm:text-base text-white/80 hover:text-white transition'>
                    {t("news-insights")}
                  </Link>
                </div>

                <div className='flex flex-col gap-3 sm:gap-4'>
                  <div className='font-bold text-xs sm:text-sm font-inter text-white/90'>
                    {t("contact")}
                  </div>

                  <div className='flex items-start gap-2.5 sm:gap-3'>
                    <div className='pt-0.5'>
                      <FaMapMarkerAlt className='text-[#ef7a0b]' size={16} />
                    </div>
                    <p className='whitespace-pre text-xs sm:text-sm text-white/80 leading-relaxed'>
                      {t("address")}
                    </p>
                  </div>

                  <div className='flex items-center gap-2.5 sm:gap-3'>
                    <Phone className='text-[#ef7a0b]' size={16} />
                    <p className='text-xs sm:text-sm text-white/80'>+976 7775-2050</p>
                  </div>

                  <div className='flex items-center gap-2.5 sm:gap-3'>
                    <Mail className='text-[#ef7a0b]' size={16} />
                    <p className='text-xs sm:text-sm text-white/80'>
                      info@balancedgrowth.mn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* Bottom bar */}
      <div className='bg-[#242424] w-full mx-auto text-xs sm:text-sm text-gray-500 relative z-10'>
        <div className='max-w-7xl mx-auto h-9 sm:h-10 flex items-center px-4 sm:px-6 md:px-12'>
          © {new Date().getFullYear()} {t("reserved")}
        </div>
      </div>
    </div>
  )
}
