"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { featuredProducts } from "@/lib/data"

export function FeaturedProducts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const display = featuredProducts.slice(0, 6)
  const [startIndex, setStartIndex] = useState(0)

  const visibleCount = 3
  const canGoNext = startIndex + visibleCount < display.length
  const canGoPrev = startIndex > 0

  return (
    <section className="py-16 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xl font-black text-foreground"
          >
            محصولات برتر
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all duration-300 ml-4"
            >
              مشاهده همه
              <ArrowLeft size={14} />
            </Link>
            <button
              onClick={() => setStartIndex((i) => Math.max(0, i - 1))}
              disabled={!canGoPrev}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="قبلی"
            >
              <ChevronRight size={15} />
            </button>
            <button
              onClick={() => setStartIndex((i) => Math.min(display.length - visibleCount, i + 1))}
              disabled={!canGoNext}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="بعدی"
            >
              <ChevronLeft size={15} />
            </button>
          </motion.div>
        </div>

        {/* Grid — 2 col mobile, 3 col tablet, 6 col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {display.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div
                  className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/50 mb-3 transition-all duration-500 group-hover:border-gold/30"
                  style={{ boxShadow: "var(--glow)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--glow-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--glow)")}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300 leading-snug mb-0.5">
                  {product.model || product.name}
                </h3>
                <p className="text-xs text-muted-foreground">{product.categoryLabel}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
