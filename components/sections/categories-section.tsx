"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft } from "lucide-react"

const cats = [
  {
    id: "hood",
    label: "هود آشپزخانه",
    description: "شومینه‌ای و مخفی با قدرت مکش ۸۵۰ m³/h",
    image: "/images/categories/hood.png",
  },
  {
    id: "hob",
    label: "اجاق گاز",
    description: "صفحه شیشه‌ای و استیل با ۵ تا ۶ شعله",
    image: "/images/categories/hob.png",
    count: "۴۰+ مدل",
  },
  {
    id: "sink",
    label: "سینک آشپزخانه",
    description: "دست‌ساز، فانتزی و گرانیتی با ضمانت ۲ سال",
    image: "/images/categories/sink.png",
    count: "۲۰+ مدل",
  },
  {
    id: "oven",
    label: "فر توکار",
    description: "برقی با تا ۱۸ برنامه پخت، کلاس انرژی A",
    image: "/images/categories/oven.png",
    count: "۵ مدل",
  },
]

export function CategoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-28 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">دسته‌بندی‌ها</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-black text-foreground"
            >
              خانواده محصولات
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden sm:block"
          >
            <Link
              href="/products"
              className="flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all duration-300"
            >
              مشاهده همه
              <ArrowLeft size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/products?cat=${cat.id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4">
                    <span className="text-[11px] tracking-widest text-foreground/60 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-gold transition-colors duration-300">
                  {cat.label}
                </h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
