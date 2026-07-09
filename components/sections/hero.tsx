"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search } from "lucide-react"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products")
  }

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
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="w-12 h-px bg-gold" />
          <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">Since 2009</span>
          <span className="w-12 h-px bg-gold" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl font-black text-foreground leading-tight tracking-tight text-balance mb-8"
        >
          محصول مورد نظر خود را
          <span className="text-gold"> جستجو </span>
          کنید
        </motion.h1>

        {/* Professional search box */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
          role="search"
        >
          <div className="group flex items-center gap-2 bg-card/80 backdrop-blur-xl border border-border rounded-full p-2 pr-6 shadow-2xl focus-within:border-gold/60 transition-colors duration-300">
            <Search size={20} className="text-muted-foreground shrink-0 group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در هود، اجاق گاز، سینک، فر ..."
              aria-label="جستجوی محصولات"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base outline-none py-2"
            />
            <button
              type="submit"
              className="shrink-0 px-6 py-3 bg-gold text-background font-semibold text-sm rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              جستجو
            </button>
          </div>
          <p className="text-xs text-foreground/40 mt-4">
            بیش از ۱۰۰ محصول در ۵ دسته‌بندی — هود، اجاق گاز، سینک، فر و ماکروویو
          </p>
        </motion.form>
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
