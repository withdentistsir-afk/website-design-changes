"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, Clock } from "lucide-react"

const articles = [
  {
    id: 1,
    date: "۲۵ خرداد ۱۴۰۳",
    readTime: "۵ دقیقه",
    title: "راهنمای جامع خرید هود آشپزخانه",
    excerpt: "نکات کلیدی برای انتخاب هود مناسب بر اساس ابعاد و سبک آشپزخانه شما",
    image: "/images/categories/hood.png",
    tag: "هود",
  },
  {
    id: 2,
    date: "۲۸ خرداد ۱۴۰۳",
    readTime: "۴ دقیقه",
    title: "تفاوت اجاق گاز رومیزی و توکار",
    excerpt: "بررسی دقیق مزایا، معایب و شرایط استفاده از اجاق‌های مختلف",
    image: "/images/categories/hob.png",
    tag: "اجاق گاز",
  },
  {
    id: 3,
    date: "۳۰ خرداد ۱۴۰۳",
    readTime: "۳ دقیقه",
    title: "نگهداری و تمیزکاری سینک استیل",
    excerpt: "با چند دقیقه مراقبت ساده، سینک آشپزخانه خود را همیشه درخشان نگه دارید",
    image: "/images/categories/sink.png",
    tag: "سینک",
  },
  {
    id: 4,
    date: "۲ تیر ۱۴۰۳",
    readTime: "۶ دقیقه",
    title: "انتخاب فر توکار مناسب برای آشپزخانه مدرن",
    excerpt: "از تعداد برنامه‌های پخت تا ظرفیت؛ همه چیز درباره فر توکار",
    image: "/images/categories/oven.png",
    tag: "فر توکار",
  },
]

export function ArticlesStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">وبلاگ</span>
            </div>
            <h2 className="text-2xl font-black text-foreground">آخرین مقالات</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/gallery"
              className="flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all duration-300"
            >
              مشاهده همه
              <ArrowLeft size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal strip — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.07 + i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/gallery"
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-border/50 bg-background hover:border-gold/30 transition-all duration-400"
                style={{ boxShadow: "var(--glow)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-hover)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--glow)")}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-card shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm border border-border/50 text-[10px] font-semibold text-gold">
                    {article.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] text-muted-foreground">{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300 leading-snug mb-2 text-balance">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ادامه مطلب
                    <ArrowLeft size={11} />
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
