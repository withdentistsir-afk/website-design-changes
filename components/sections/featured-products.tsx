"use client"

import { useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { products, type Product } from "@/lib/data"

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let s = seed
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function FeaturedProducts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  // Pick 8 random products from all categories (seeded so consistent per session)
  const display = useMemo(() => {
    const shuffled = seededShuffle(products, 42)
    return shuffled.slice(0, 8)
  }, [])

  const row1 = display.slice(0, 4)
  const row2 = display.slice(4, 8)

  return (
    <section className="py-20 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">محصولات</span>
            </div>
            <h2 className="text-2xl font-black text-foreground">محصولات برتر</h2>
          </motion.div>
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

        {/* Row 1 — 4 products */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {row1.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} inView={inView} />
          ))}
        </div>

        {/* Row 2 — 4 products */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {row2.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 4} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProductCard({
  product,
  index,
  inView,
}: {
  product: Product
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div
          className="relative aspect-square rounded-2xl overflow-hidden bg-background border border-border/50 mb-3 transition-all duration-500 group-hover:border-gold/40"
          style={{ boxShadow: "var(--glow)" }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--glow-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--glow)")}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-5 transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          {/* Category label badge */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-[10px] text-muted-foreground font-medium">
            {product.categoryLabel}
          </div>
        </div>
        <h3 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300 leading-snug mb-0.5 truncate">
          {product.model || product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.categoryLabel}</p>
      </Link>
    </motion.div>
  )
}
