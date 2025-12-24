"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SliderProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
}

export default function Slider({ items, autoPlay = true, interval = 5000 }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  return (
    <div className='relative w-full h-full'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className='w-full h-full'>
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToPrev}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors'>
        ←
      </button>

      <button
        onClick={goToNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors'>
        →
      </button>

      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
