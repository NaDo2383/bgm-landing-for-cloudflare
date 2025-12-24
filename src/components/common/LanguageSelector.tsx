"use client"

import { US } from "country-flag-icons/react/3x2"
import { MN } from "country-flag-icons/react/3x2"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LanguageSelector() {
  const [locale, setLocale] = useState<string>("")
  const router = useRouter()

  const handleToggle = () => {
    if (locale === "en") {
      setLocale("mn")
      document.cookie = `BGM_LOCALE=mn;`
    } else {
      setLocale("en")
      document.cookie = `BGM_LOCALE=en;`
    }
    router.refresh()
  }

  const currentText = locale === "en" ? "MN" : "EN"

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("BGM_LOCALE="))
      ?.split("=")[1]

    if (cookieLocale) {
      setLocale(cookieLocale)
    } else {
      setLocale("en")
      document.cookie = `BGM_LOCALE=en;`
      router.refresh()
    }
  }, [router])

  return (
    <button
      onClick={handleToggle}
      className='text-white rounded-full p-[1.5px] flex items-center transition-all cursor-pointer'
      style={{
        background:
          "linear-gradient(122deg,rgba(255, 255, 255, 1) 2%, #211d1c 25%, #211d1c 75%, rgba(255, 255, 255, 1) 98%)",
      }}>
      <span className='text-sm font-medium rounded-full px-6 py-2.5 flex items-center !bg-[#211d1c] border-none'>
        {currentText}
      </span>
    </button>
  )
}
