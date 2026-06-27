"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { products, categories, type ProductCategory } from "@/lib/data"

const catMap: Record<string, string> = {
  hood: "هود آشپزخانه",
  hob: "اجاق گاز",
  sink: "سینک آشپزخانه",
  oven: "فر توکار",
  microwave: "ماکروویو",
}

export default function ProductsPage() {
  const [active, setActive] = useState<ProductCategory | "all">("all")
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">محصولات کلایبرگ</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-foreground mb-4"
          >
            همه محصولات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl leading-relaxed"
          >
            بیش از ۱۰۰ محصول در ۵ دسته‌بندی با بالاترین استانداردهای کیفیت
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />
            <button
              onClick={() => setActive("all")}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === "all"
                  ? "bg-gold text-background"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              همه
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id as ProductCategory)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat.id
                    ? "bg-gold text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Count */}
          <p className="text-sm text-muted-foreground mb-8">
            {filtered.length} محصول
          </p>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <Link href={`/products/${product.id}`} className="group block">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-background/5 transition-colors duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] tracking-wider text-foreground/60 bg-background/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/30">
                        {product.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-1">{product.model}</p>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              محصولی یافت نشد
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
