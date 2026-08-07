"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

const awards = [
  {
    image: "/images/awards/award-1.png",
    title: "برند برتر صنعت",
    subtitle: "جشنواره ملی کیفیت — ۱۴۰۲",
  },
  {
    image: "/images/awards/award-2.png",
    title: "گواهی کیفیت ISO",
    subtitle: "مدیریت کیفیت بین‌المللی",
  },
  {
    image: "/images/awards/award-3.png",
    title: "بهترین طراحی محصول",
    subtitle: "نمایشگاه لوازم خانگی — ۱۴۰۱",
  },
  {
    image: "/images/awards/award-4.png",
    title: "نشان اعتماد مشتریان",
    subtitle: "رضایت‌مندی مصرف‌کنندگان",
  },
]

export function AwardsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <>
    <div className="gold-line" />
    <section className="py-16 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">افتخارات ما</span>
            <span className="w-8 h-px bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-black text-foreground text-balance mb-4"
          >
            جوایز و گواهینامه‌ها
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty"
          >
            {"این متن به صورت پیش‌فرض قرار داده شده و بعداً قابل تغییر است. افتخارات و جوایز دریافتی کلایبرگ در طول سال‌های فعالیت."}
          </motion.p>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-border rounded-2xl bg-card overflow-hidden hover:border-gold/40 transition-all duration-500"
              style={{ boxShadow: 'var(--glow)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--glow-hover)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--glow)')}

            >
              <div className="relative aspect-square bg-surface overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                  {award.title}
                </h3>
                <p className="text-xs text-muted-foreground">{award.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <div className="gold-line" />
    </>
  )
}
