"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { featuredProducts } from "@/lib/data"

export function FeaturedProducts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const display = featuredProducts.slice(0, 6)

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">انتخاب سردبیر</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-black text-foreground"
            >
              محصولات برتر
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden sm:block"
          >
            <Link href="/products" className="flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all duration-300">
              مشاهده همه
              <ArrowLeft size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface mb-5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    loading="lazy"
                    quality={80}
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/5 transition-colors duration-500" />
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] tracking-widest text-foreground/60 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/40">
                      {product.categoryLabel}
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{product.model}</p>
                    <h3 className="font-bold text-foreground group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-1">{product.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mt-1 shrink-0 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                    <ArrowLeft size={13} />
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
