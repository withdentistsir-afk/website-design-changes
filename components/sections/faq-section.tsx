"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus, Minus, ShoppingBag, Wrench } from "lucide-react"

const purchaseFaqs = [
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
  {
    q: "روش‌های پرداخت چیست؟",
    a: "پرداخت آنلاین، کارت به کارت، و اقساط بانکی از طریق شرکای مالی ما امکان‌پذیر است.",
  },
]

const warrantyFaqs = [
  {
    q: "گارانتی محصولات شامل چه مواردی می‌شود؟",
    a: "تمامی محصولات کلایبرگ دارای ۲ سال ضمانت کامل و ۱۰ سال گارانتی قطعات اصلی هستند. خدمات پس از فروش در سرتاسر ایران ارائه می‌شود.",
  },
  {
    q: "آیا امکان نصب توسط تکنیسین وجود دارد؟",
    a: "بله، تیم نصب حرفه‌ای کلایبرگ در تهران و شهرهای بزرگ آماده ارائه خدمات نصب تخصصی است.",
  },
  {
    q: "نحوه تماس با واحد خدمات پس از فروش چیست؟",
    a: "می‌توانید از طریق خط ویژه ۰۲۱-XXXX-XXXX یا فرم تماس سایت با واحد خدمات پس از فروش ارتباط برقرار کنید.",
  },
  {
    q: "قطعات یدکی محصولات در کجا تهیه می‌شود؟",
    a: "قطعات یدکی اصلی کلایبرگ از طریق نمایندگان رسمی و دفتر مرکزی قابل تهیه هستند. موجودی قطعات ۱۰ سال تضمین شده است.",
  },
  {
    q: "تعمیرات بعد از دوره گارانتی چگونه است؟",
    a: "پس از پایان دوره گارانتی، خدمات تعمیراتی با هزینه مناسب و با استفاده از قطعات اصلی توسط تکنیسین‌های مجاز ارائه می‌شود.",
  },
]

function FaqColumn({
  icon: Icon,
  label,
  faqs,
  accentClass,
  inView,
  delay,
}: {
  icon: React.ElementType
  label: string
  faqs: { q: string; a: string }[]
  accentClass: string
  inView: boolean
  delay: number
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      {/* Column header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border/60">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClass}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground tracking-widest uppercase mb-0.5">FAQ</p>
          <h3 className="text-lg font-black text-foreground">{label}</h3>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2 flex-1">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                isOpen
                  ? "border-gold/40 bg-gold/5"
                  : "border-border/50 bg-card hover:border-border"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-right gap-3"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
                    isOpen ? "text-gold" : "text-foreground"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "border-gold text-gold bg-gold/10"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {isOpen ? <Minus size={11} /> : <Plus size={11} />}
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
                    <div className="px-5 pb-4 border-t border-gold/20 pt-3">
                      <p className="text-sm text-muted-foreground leading-7">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function FaqSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">پشتیبانی</span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-3">سوالات متداول</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            پاسخ سوالات رایج مشتریان را در دو بخش خرید و خدمات بیابید
          </p>
        </motion.div>

        {/* Side-by-side columns */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
          <div className="flex-1">
            <FaqColumn
              icon={ShoppingBag}
              label="خرید و سفارش"
              faqs={purchaseFaqs}
              accentClass="bg-gold/10 text-gold"
              inView={inView}
              delay={0.1}
            />
          </div>
          <div className="hidden lg:block w-px bg-border/50 mx-8 shrink-0" />
          <div className="flex-1">
            <FaqColumn
              icon={Wrench}
              label="گارانتی و خدمات"
              faqs={warrantyFaqs}
              accentClass="bg-gold/10 text-gold"
              inView={inView}
              delay={0.2}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
