"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqCategories = [
  {
    id: "purchase",
    label: "خرید و سفارش",
    faqs: [
      {
        q: "چگونه محصول مناسب با نیاز خود را انتخاب کنیم؟",
        a: "با توجه به ابعاد آشپزخانه، تعداد شعله‌های مورد نیاز و سبک دکوراسیون خود محصول مناسب را انتخاب کنید. کارشناسان ما آماده راهنمایی تخصصی هستند.",
      },
      {
        q: "زمان ارسال سفارش چقدر است؟",
        a: "سفارشات در تهران ۲ تا ۳ روز کاری و در سایر شهرها ۵ تا ۷ روز کاری پس از تایید سفارش ارسال می‌شوند.",
      },
      {
        q: "آیا امکان مشاهده محصولات به صورت حضوری وجود دارد؟",
        a: "بله، شما می‌توانید از طریق نمایندگان رسمی کلایبرگ در سرتاسر ایران محصولات را به صورت حضوری مشاهده و لمس کنید.",
      },
      {
        q: "شرایط بازگشت کالا چیست؟",
        a: "در صورت وجود نقص فنی یا عدم مطابقت با مشخصات، تا ۷ روز پس از دریافت امکان مرجوعی وجود دارد.",
      },
    ],
  },
  {
    id: "warranty",
    label: "گارانتی و خدمات",
    faqs: [
      {
        q: "گارانتی محصولات شامل چه مواردی می‌شود؟",
        a: "تمامی محصولات کلایبرگ دارای ۲ سال ضمانت کامل و ۱۰ سال گارانتی قطعات اصلی هستند. خدمات پس از فروش در سرتاسر ایران ارائه می‌شود.",
      },
      {
        q: "آیا امکان نصب توسط تکنیسین وجود دارد؟",
        a: "بله، تیم نصب حرفه‌ای کلایبرگ در تهران و شهرهای بزرگ آماده ارائه خدمات نصب تخصصی است. هزینه نصب متفاوت است.",
      },
      {
        q: "نحوه تماس با واحد خدمات پس از فروش چیست؟",
        a: "می‌توانید از طریق خط ویژه ۰۲۱-XXXX-XXXX یا فرم تماس سایت با واحد خدمات پس از فروش ارتباط برقرار کنید.",
      },
      {
        q: "قطعات یدکی محصولات در کجا تهیه می‌شود؟",
        a: "قطعات یدکی اصلی کلایبرگ از طریق نمایندگان رسمی و دفتر مرکزی قابل تهیه هستند. موجودی قطعات ۱۰ سال تضمین شده است.",
      },
    ],
  },
]

export function FaqSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [activeCategory, setActiveCategory] = useState("purchase")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const activeFaqs = faqCategories.find((c) => c.id === activeCategory)?.faqs ?? []

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">پشتیبانی</span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-3">سوالات متداول</h2>
          <p className="text-sm text-muted-foreground">پاسخ سوالات رایج مشتریان ما را اینجا بیابید</p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="flex justify-center gap-3 mb-10"
        >
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(0) }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-background bg-gold shadow-lg shadow-gold/20"
                  : "text-muted-foreground border border-border hover:border-gold/50 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            {activeFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-gold/40 bg-gold/5"
                      : "border-border/60 bg-card hover:border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-right gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-gold" : "text-foreground"}`}>
                      {faq.q}
                    </span>
                    <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "border-gold text-gold bg-gold/10" : "border-border text-muted-foreground"
                    }`}>
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 border-t border-gold/20 pt-4">
                          <p className="text-sm text-muted-foreground leading-7">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
