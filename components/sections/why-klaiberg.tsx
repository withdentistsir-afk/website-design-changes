"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, ShieldCheck, BadgeCheck, HeadphonesIcon } from "lucide-react"

const pillars = [
  {
    icon: Cpu,
    title: "تکنولوژی روز",
    description: "استفاده از پیشرفته‌ترین فناوری‌های تولید و مهندسان برتر صنعت",
    accent: "from-gold/10 to-gold/5",
    border: "border-gold/20 hover:border-gold/50",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
  },
  {
    icon: ShieldCheck,
    title: "استانداردهای جهانی",
    description: "دارای گواهینامه‌های ISO، CE و استاندارد ملی ایران",
    accent: "from-accent/10 to-accent/5",
    border: "border-accent/20 hover:border-accent/50",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: BadgeCheck,
    title: "کیفیت تضمین‌شده",
    description: "۲ سال ضمانت و ۱۰ سال گارانتی قطعات اصلی",
    accent: "from-gold/10 to-gold/5",
    border: "border-gold/20 hover:border-gold/50",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
  },
  {
    icon: HeadphonesIcon,
    title: "پشتیبانی سرتاسری",
    description: "خدمات پس از فروش قوی در تمام نقاط ایران",
    accent: "from-accent/10 to-accent/5",
    border: "border-accent/20 hover:border-accent/50",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
]

export function WhyKlaiberg() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">چرا کلایبرگ</span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground text-balance leading-tight">
            تفاوت را احساس کنید
          </h2>
        </motion.div>

        {/* Four boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col gap-5 p-7 rounded-2xl border bg-gradient-to-br ${pillar.accent} ${pillar.border} bg-card transition-all duration-400`}
            >
              {/* Top-left glow dot */}
              <div className="absolute top-5 left-5 w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-300" />

              <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                <pillar.icon size={22} className={pillar.iconColor} strokeWidth={1.6} />
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom line accent */}
              <div className={`absolute bottom-0 inset-x-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
