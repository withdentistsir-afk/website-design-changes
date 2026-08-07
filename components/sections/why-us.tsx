"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Diamond, BadgeCheck, Headphones, Truck } from "lucide-react"

const pillars = [
  {
    icon: Diamond,
    title: "کیفیت بی‌نظیر",
    description: "استفاده از بهترین مترین متریال",
  },
  {
    icon: BadgeCheck,
    title: "گارانتی معتبر",
    description: "خدمات پس از فروش مطمئن",
  },
  {
    icon: Headphones,
    title: "پشتیبانی حرفه‌ای",
    description: "مشاوره و راهنمایی قبل و بعد از خرید",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "تحویل در سریع‌ترین زمان",
  },
]

export function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-14 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-border/50"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center px-4 gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-1">
                <pillar.icon size={20} className="text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-foreground">{pillar.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
