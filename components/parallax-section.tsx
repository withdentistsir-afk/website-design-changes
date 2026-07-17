"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  /** Background image path (dark themed) */
  image?: string
  /** Max opacity of the background (kept very low / subtle) */
  opacity?: number
}

export function ParallaxSection({
  children,
  image = "/images/parallax-dark.png",
  opacity = 0.06,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Move the background slowly as the user scrolls for a subtle parallax feel
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.25])

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Subtle animated parallax background */}
      <motion.div
        aria-hidden="true"
        style={{ y, scale, opacity }}
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <Image
          src={image}
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
          quality={40}
        />
      </motion.div>

      {/* Section content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
