"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, Factory, Globe, ShieldCheck, Wrench } from "lucide-react"

const stats = [
  { value: "۱۵+", label: "سال تجربه" },
  { value: "۲۰۰+", label: "نمایندگی فعال" },
  { value: "۵۰۰+", label: "محصول متنوع" },
  { value: "۱M+", label: "مشتری راضی" },
]

const pillars = [
  {
    icon: Factory,
    title: "تولید پیشرفته",
    text: "خطوط تولید اتوماتیک با تکنولوژی روز اروپا",
  },
  {
    icon: Globe,
    title: "استانداردهای جهانی",
    text: "گواهینامه‌های ISO، CE و استاندارد ملی ایران",
  },
  {
    icon: ShieldCheck,
    title: "کیفیت تضمین‌شده",
    text: "۲ سال ضمانت و ۱۰ سال گارانتی قطعات اصلی",
  },
  {
    icon: Wrench,
    title: "پشتیبانی سرتاسری",
    text: "شبکه خدمات پس از فروش در تمام استان‌های ایران",
  },
]

export function AboutPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      className="py-24 px-6 overflow-hidden bg-background border-b"
      style={{ borderColor: "rgba(86,181,190,0.4)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Top: label + heading + image in a magazine-style grid ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">

          {/* Left col: text block (spans 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">درباره کلایبرگ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-6 text-balance">
                پیشرو در<br />
                <span className="text-gold">لوازم خانگی</span><br />
                توکار ایران
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed mb-8 text-pretty max-w-md">
                کلایبرگ از سال ۱۳۸۸ با تکیه بر دانش مهندسان ایرانی و تکنولوژی اروپایی، تولیدکننده هود، فر، سینک و اجاق گاز توکار در ایران است. هدف ما ارتقای سطح آشپزخانه‌های ایرانی با محصولاتی در کلاس جهانی است.
              </p>
            </div>

            <Link
              href="/about"
              className="group self-start inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-background font-semibold text-sm rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg"
            >
              بیشتر بدانید
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right col: image (spans 7) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 relative"
          >
            <div
              className="relative aspect-[16/9] rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--glow-hover)" }}
            >
              <Image
                src="/images/about-factory.png"
                alt="کارخانه کلایبرگ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating "since" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="absolute top-5 left-5 border border-gold/40 bg-background/80 backdrop-blur-sm px-5 py-3 rounded-2xl"
            >
              <div className="text-gold text-xs font-medium tracking-widest uppercase mb-0.5">تاسیس</div>
              <div className="text-foreground text-2xl font-black">۱۳۸۸</div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="bg-card flex flex-col items-center justify-center py-8 px-4 text-center hover:bg-surface transition-colors duration-300"
            >
              <span className="text-3xl sm:text-4xl font-black text-gold mb-1">{stat.value}</span>
              <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Four pillars ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border border-border rounded-2xl bg-card p-6 hover:border-gold/50 transition-all duration-500 overflow-hidden"
                style={{ boxShadow: "var(--glow)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glow-hover)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
              >
                {/* accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-3xl transition-all duration-500 group-hover:bg-gold/10" />

                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.text}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
