"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, ChevronLeft } from "lucide-react"

const cats = [
  {
    id: "hood",
    label: "هود آشپزخانه",
    image: "/images/categories/hood.png",
  },
  {
    id: "hob",
    label: "اجاق گاز",
    image: "/images/categories/hob.png",
  },
  {
    id: "sink",
    label: "سینک آشپزخانه",
    image: "/images/categories/sink.png",
  },
  {
    id: "oven",
    label: "فر توکار",
    image: "/images/categories/oven.png",
  },
]

export function CategoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xl font-black text-foreground"
          >
            دسته‌بندی محصولات
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all duration-300"
            >
              مشاهده همه
              <ArrowLeft size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/products?cat=${cat.id}`} className="group block">
                <div
                  className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/50 transition-all duration-500 group-hover:border-gold/30"
                  style={{ boxShadow: "var(--glow)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--glow-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--glow)")}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {/* Bottom label */}
                  <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-background/90 to-transparent">
                    <span className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300">
                      {cat.label}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-all duration-300">
                      <ChevronLeft size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
