// components/PopInSection.tsx
"use client"

import React, { useMemo } from "react"
import {
  motion,
  type Variants,
  type HTMLMotionProps,
  useReducedMotion,
} from "framer-motion"

type Dir = "left" | "right" | "top" | "bottom" | "random"

interface PopInSectionProps extends HTMLMotionProps<"div"> {
  from?: Dir
  /** Орж ирэх зай (px) */
  distance?: number
  /** Нийт үргэлжлэх хугацаа (sec) — tween дээр бүрэн үйлчилнэ */
  duration?: number
  /** Санамсаргүй delay [min,max] sec */
  delayRange?: [number, number]
  /** Нэг л удаа анимейт хийх эсэх */
  once?: boolean
  /** Хэдэн хувь харагдахад trigger болох (0–1) */
  amount?: number
  /** Доторх хүүхдүүдийг stagger хийх (sec) */
  staggerChildren?: number
  /** Easing — cubic-bezier эсвэл нэртэй easing */
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | [number, number, number, number]
  /** Motion type override — хүсвэл spring ашиглаж болно */
  type?: "tween" | "spring"
}

export default function PopInSection({
  children,
  className,
  from = "random",
  distance = 48, // өмнөхөөс бага, илүү зөөлөн
  duration = 0.9, // tween-д жигд хөдөлгөнө
  delayRange,
  once = true,
  amount = 0.25,
  staggerChildren = 0,
  ease = [0.22, 1, 0.36, 1], // зөөлөн easeOut cubic-bezier
  type = "tween", // ⬅️ default-оор tween
  ...rest
}: PopInSectionProps) {
  const prefersReduced = useReducedMotion()

  const dir: Exclude<Dir, "random"> = useMemo(() => {
    if (from !== "random") return from
    const dirs: Exclude<Dir, "random">[] = ["left", "right", "top", "bottom"]
    return dirs[Math.floor(Math.random() * dirs.length)]
  }, [from])

  const delay = useMemo(() => {
    if (!delayRange) return 0
    const [min, max] = delayRange
    return min + Math.random() * Math.max(0, max - min)
  }, [delayRange])

  const offset = useMemo(() => {
    switch (dir) {
      case "left":
        return { x: -distance, y: 0 }
      case "right":
        return { x: distance, y: 0 }
      case "top":
        return { x: 0, y: -distance }
      case "bottom":
        return { x: 0, y: distance }
    }
  }, [dir, distance])

  const variants: Variants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.001 } },
      }
    : {
        // Илүү зөөлөн эхлэл — бага зэрэг scale + бага offset
        hidden: { ...offset, opacity: 0, scale: 0.985 },
        show: {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          transition:
            type === "spring"
              ? {
                  type: "spring",
                  stiffness: 140, // бууруулсан stiffness
                  damping: 20, // бага damping → зөөлөн
                  mass: 1.0,
                  delay,
                  when: "beforeChildren",
                  // spring-д duration тийм ч нөлөөгүй — fallback
                  duration,
                  staggerChildren: staggerChildren || undefined,
                }
              : {
                  type: "tween",
                  ease,
                  duration, // tween-д бүрэн үйлчилнэ
                  delay,
                  when: "beforeChildren",
                  staggerChildren: staggerChildren || undefined,
                },
        },
      }

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      whileInView='show'
      viewport={{ once, amount }}
      className={className}
      {...rest}>
      {children}
    </motion.div>
  )
}
