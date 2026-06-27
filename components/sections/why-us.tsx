"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Cpu, Globe, Wrench } from "lucide-react"

const pillars = [
  {
    icon: Cpu,
    title: "تکنولوژی روز",
    description: "استفاده از پیشرفته‌ترین فناوری‌های تولید و مهندسان برتر صنعت",
  },
  {
    icon: Globe,
    title: "استانداردهای جهانی",
    description: "دارای گواهینامه‌های ISO، CE و استاندارد ملی ایران",
  },
  {
    icon: Shield,
    title: "کیفیت تضمین‌شده",
    description: "۲ سال ضمانت و ۱۰ سال گارانتی قطعات اصلی",
  },
  {
    icon: Wrench,
    title: "پشتیبانی سرتاسری",
    description: "خدمات پس از فروش قوی در تمام نقاط ایران",
  },
]

function PillarCard({ pillar, index }: { pillar: (typeof pillars)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="p-8 border border-border rounded-2xl bg-card hover:border-gold/40 transition-all duration-500 h-full">
        <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
          <pillar.icon size={20} className="text-gold" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-3">{pillar.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
      </div>
    </motion.div>
  )
}

export function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div ref={ref} className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">چرا کلایبرگ</span>
          <span className="w-8 h-px bg-gold" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-3xl sm:text-5xl font-black text-foreground text-balance"
        >
          تفاوت را احساس کنید
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <PillarCard key={p.title} pillar={p} index={i} />
        ))}
      </div>
    </section>
  )
}
