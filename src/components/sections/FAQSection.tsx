"use client"

import { useTranslations } from "next-intl"
import { useId, useState, KeyboardEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FAQSection() {
  const t = useTranslations("faq")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const baseId = useId()

  const faqs = [
    {
      question: "What is BGM?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "How can I get started?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "What services do you offer?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]

  const onToggle = (index: number) => {
    setActiveIndex((cur) => (cur === index ? null : index))
  }

  // Optional keyboard nav: Up/Down to move between headers
  const onHeaderKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = faqs.length
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const dir = e.key === "ArrowDown" ? 1 : -1
      const next = (index + dir + total) % total
      const btn = document.getElementById(
        `${baseId}-btn-${next}`
      ) as HTMLButtonElement | null
      btn?.focus()
    }
  }

  return (
    <section
      id='faq'
      className='
        bg-[#000]
        p-6 sm:p-10 lg:p-[100px]
      '>
      <div
        className='
          mx-auto
          max-w-7xl
          flex flex-col
          gap-[16px]
        '>
        {/* Left title column */}
        <div className='text-center font-norms-pro'>
          <h2 className='text-white leading-tight capitalize  text-2xl sm:text-3xl lg:text-[40px] '>
            {t("title1")}
          </h2>
          <span className='text-[#AFAFAF] font-[18px]'>{t("title2")}</span>
        </div>
        {/* Right FAQ column */}
        <div className='w-full max-w-3xl mx-auto px-0 sm:px-2'>
          <div role='list' className=' overflow-hidden'>
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index
              const panelId = `${baseId}-panel-${index}`
              const btnId = `${baseId}-btn-${index}`

              return (
                <div key={index} role='listitem' className='bg-[#000]'>
                  <button
                    id={btnId}
                    onClick={() => onToggle(index)}
                    onKeyDown={(e) => onHeaderKeyDown(e, index)}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className={`
                      w-full text-left flex items-center justify-between
                      px-4 sm:px-6 py-4 sm:py-5  ${
                        isOpen ? "rounded-t-[30px]" : "rounded-[30px] mb-2"
                      } bg-[#111111]
                      transition-all text-[26px] font-norms-pro text-[#919191]
                      ${isOpen ? "bg-[#0F172B]" : "hover:bg-white/5"}
                    `}>
                    <span className=' font-medium text-sm sm:text-base'>
                      {faq.question}
                    </span>

                    {/* Caret icon rotates on open */}
                    <svg
                      className={`h-6 w-6 transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 25'
                      fill='none'
                      aria-hidden='true'>
                      <path
                        d='M20.031 9.66776L12.531 17.1678C12.4614 17.2375 12.3787 17.2928 12.2876 17.3306C12.1966 17.3683 12.099 17.3877 12.0004 17.3877C11.9019 17.3877 11.8043 17.3683 11.7132 17.3306C11.6222 17.2928 11.5394 17.2375 11.4698 17.1678L3.96979 9.66776C3.82906 9.52703 3.75 9.33616 3.75 9.13714C3.75 8.93811 3.82906 8.74724 3.96979 8.60651C4.11052 8.46578 4.30139 8.38672 4.50042 8.38672C4.69944 8.38672 4.89031 8.46578 5.03104 8.60651L12.0004 15.5768L18.9698 8.60651C19.0395 8.53683 19.1222 8.48155 19.2132 8.44384C19.3043 8.40613 19.4019 8.38672 19.5004 8.38672C19.599 8.38672 19.6965 8.40613 19.7876 8.44384C19.8786 8.48155 19.9614 8.53683 20.031 8.60651Z'
                        fill='#919191'
                      />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role='region'
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className='overflow-hidden'>
                        <div
                          className='
                            px-4 sm:px-6 py-4 sm:py-5 mb-2 rounded-b-[30px]
                            bg-[#0F172B] text-white text-sm sm:text-[16px] relative
                          '>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
