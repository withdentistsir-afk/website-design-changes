"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus, Minus, ArrowLeft } from "lucide-react"

const faqs = [
  {
    q: "چگونه محصول مناسب با نیاز خود را انتخاب کنیم؟",
    a: "با توجه به ابعاد آشپزخانه، تعداد شعله‌های مورد نیاز و سبک دکوراسیون خود محصول مناسب را انتخاب کنید. کارشناسان ما آماده راهنمایی هستند.",
  },
  {
    q: "گارانتی محصولات شامل چه مواردی می‌شود؟",
    a: "تمامی محصولات کلایبرگ دارای ۲ سال ضمانت و ۱۰ سال گارانتی قطعات اصلی هستند. خدمات پس از فروش در سرتاسر ایران ارائه می‌شود.",
  },
  {
    q: "زمان ارسال سفارش چقدر است؟",
    a: "سفارشات در تهران ۲ تا ۳ روز کاری و در سایر شهرها ۵ تا ۷ روز کاری پس از تایید سفارش ارسال می‌شوند.",
  },
  {
    q: "آیا امکان نصب توسط تکنیسین وجود دارد؟",
    a: "بله، تیم نصب حرفه‌ای کلایبرگ در تهران و شهرهای بزرگ آماده ارائه خدمات نصب تخصصی است.",
  },
]

const articles = [
  {
    id: 1,
    date: "۱۴۰۳/۰۳/۲۵",
    title: "راهنمای خرید هود آشپزخانه",
    excerpt: "نکته مهم برای انتخاب بهترین هود آشپزخانه...",
    image: "/images/categories/hood.png",
  },
  {
    id: 2,
    date: "۱۴۰۳/۰۳/۲۸",
    title: "تفاوت اجاق گاز رومیزی و توکار",
    excerpt: "بررسی مزایا و معایب اجاق‌گازهای مختلف...",
    image: "/images/categories/hob.png",
  },
  {
    id: 3,
    date: "۱۴۰۳/۰۳/۳۰",
    title: "نگهداری و تمیز کردن سینک استیل",
    excerpt: "با چند دقیقه ساده، سینک آشپزخانه خود را همیشه...",
    image: "/images/categories/sink.png",
  },
]

export function FaqArticles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-black text-foreground">سوالات متداول</h2>
              <Link href="/about" className="flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all duration-300">
                مشاهده همه
                <ArrowLeft size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-border rounded-xl overflow-hidden bg-background/50 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-right gap-4"
                  >
                    <span className="text-sm font-medium text-foreground leading-snug">{faq.q}</span>
                    <span className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors">
                      {openIndex === i ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Articles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-black text-foreground">آخرین مقالات</h2>
              <Link href="/gallery" className="flex items-center gap-1.5 text-sm text-gold hover:gap-2.5 transition-all duration-300">
                مشاهده همه
                <ArrowLeft size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <Link href="/gallery" className="group flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface shrink-0 border border-border/50">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1.5">{article.date}</p>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300 leading-snug mb-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
