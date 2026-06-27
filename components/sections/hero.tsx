"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-hood.png"
          alt="هود شومینه‌ای کلایبرگ"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="w-12 h-px bg-gold" />
          <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">Since 2009</span>
          <span className="w-12 h-px bg-gold" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-foreground leading-tight tracking-tight text-balance mb-6"
        >
          بهانه‌ای
          <span className="block text-gold">برای آشپزی</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed mb-12 text-pretty"
        >
          کلایبرگ، پیشرو در نوآوری و کیفیت لوازم آشپزخانه. هود، فر، سینک و اجاق گاز توکار با بالاترین استانداردهای بین‌المللی.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group flex items-center gap-3 px-8 py-4 bg-gold text-background font-semibold text-sm rounded-full hover:bg-gold-light transition-all duration-300 hover:gap-4"
          >
            مشاهده محصولات
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border border-foreground/30 text-foreground/80 font-medium text-sm rounded-full hover:border-foreground hover:text-foreground transition-all duration-300"
          >
            درباره کلایبرگ
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 right-1/2 translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-foreground/40 uppercase">اسکرول</span>
        <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
          <motion.div
            className="w-full bg-gold absolute top-0"
            style={{ height: "40%" }}
            animate={{ y: ["0%", "250%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
