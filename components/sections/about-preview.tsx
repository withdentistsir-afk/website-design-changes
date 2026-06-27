"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

const highlights = [
  "تولیدکننده پیشرو هود، فر، سینک و اجاق گاز توکار",
  "متعهد به استانداردهای ISO، CE و ملی ایران",
  "خدمات پس از فروش سرتاسری در ایران",
  "۲ سال ضمانت و ۱۰ سال گارانتی قطعات اصلی",
]

export function AboutPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/about-factory.png"
                alt="کارخانه کلایبرگ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="absolute -bottom-5 -left-5 bg-gold text-background px-6 py-4 rounded-2xl shadow-2xl"
            >
              <div className="text-3xl font-black">۱۵+</div>
              <div className="text-xs font-medium">سال تجربه</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">درباره ما</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground leading-tight mb-6 text-balance">
              قلب خانه‌های شما
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 text-pretty">
              کلایبرگ، پیشرو در نوآوری و کیفیت لوازم خانگی، با افتخار تولیدکننده هود، فر، سینک و اجاق گاز توکار است. با تکیه بر تکنولوژی روز تولید و متعهد به ارائه محصولاتی با بالاترین استانداردها، ایمنی و کارآمد برای قلب خانه‌های شما هستیم.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-7 py-3.5 border border-foreground/30 text-foreground font-medium text-sm rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              بیشتر بدانید
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
