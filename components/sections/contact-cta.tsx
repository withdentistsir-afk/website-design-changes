"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, Phone } from "lucide-react"

export function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-card border border-border rounded-3xl overflow-hidden p-12 sm:p-16 text-center"
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.71_0.09_80/8%)_0%,transparent_70%)]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">ارتباط با ما</span>
              <span className="w-8 h-px bg-gold" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-5 text-balance">
              آماده همکاری هستیم
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 text-pretty">
              برای اطلاع از آخرین محصولات، قیمت‌ها و نمایندگی‌های کلایبرگ با ما تماس بگیرید.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 bg-gold text-background font-semibold text-sm rounded-full hover:bg-gold-light transition-all duration-300 hover:gap-4"
              >
                تماس با ما
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:02100000000"
                className="flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground/80 font-medium text-sm rounded-full hover:border-foreground hover:text-foreground transition-all duration-300"
              >
                <Phone size={15} />
                تماس تلفنی
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
