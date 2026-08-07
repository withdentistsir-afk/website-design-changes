"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Shield, Globe, Cpu, Leaf } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StatsSection } from "@/components/sections/stats-section"
import { ContactCTA } from "@/components/sections/contact-cta"
import { certificates } from "@/lib/data"

const timeline = [
  { year: "۱۳۸۸", title: "تأسیس کلایبرگ", desc: "آغاز فعالیت با تولید اجاق گاز توکار" },
  { year: "۱۳۹۲", title: "توسعه خط هود", desc: "راه‌اندازی خط تولید هودهای شومینه‌ای" },
  { year: "۱۳۹۵", title: "دریافت ISO", desc: "اخذ گواهینامه بین‌المللی مدیریت کیفیت" },
  { year: "۱۳۹۸", title: "دریافت CE", desc: "تأییدیه انطباق اروپایی برای صادرات" },
  { year: "۱۴۰۰", title: "محصولات Touchless", desc: "معرفی هودهای لمس‌نشده با سنسور حرکت" },
  { year: "۱۴۰۳", title: "۱۰۰+ محصول", desc: "بیش از ۱۰۰ مدل متنوع در ۵ دسته‌بندی" },
]

const values = [
  { icon: Cpu, title: "نوآوری", desc: "استفاده از پیشرفته‌ترین فناوری‌ها و مهندسان برتر صنعت" },
  { icon: Shield, title: "کیفیت", desc: "استانداردهای ISO، CE و ملی ایران در تمامی محصولات" },
  { icon: Leaf, title: "محیط زیست", desc: "تعهد عمیق به محیط‌زیست و تولید سبز" },
  { icon: Globe, title: "جهانی", desc: "رقابت در عرصه بین‌المللی با محصولات درخور و با اعتبار جهانی" },
]

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`py-20 px-6 ${className}`}>{children}</div>
}

export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <main className="min-h-screen bg-background">
      <div className="hidden lg:block"><Navbar /></div>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-background">
        <div className="absolute inset-0">
          <Image src="/images/about-factory.png" alt="کارخانه کلایبرگ" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </div>
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">داستان ما</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-foreground text-balance"
          >
            درباره کلایبرگ
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed font-medium text-pretty">
              کلایبرگ، پیشرو در نوآوری و کیفیت لوازم خانگی، با افتخار تولیدکننده هود، فر، سینک و اجاق گاز توکار است.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mt-6 text-pretty">
              با تکیه بر تکنولوژی روز تولید و متعهد به ارائه محصولاتی با بالاترین استانداردها، ایمنی و کارآمد برای قلب خانه‌های شما هستیم. چشم‌انداز ما فراتر از مرزهای داخلی است؛ ما با هدف رقابت در عرصه بین‌المللی، همواره در تلاشیم تا محصولاتی درخور و با اعتبار جهانی تولید کنیم. این جاه‌طلبی، ما را به سمت تحقیق و توسعه مداوم، بکارگیری بهترین مهندسان و طراحان، و استفاده از پیشرفته‌ترین فناوری‌ها سوق می‌دهد.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">ارزش‌های ما</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">چه چیزی ما را متمایز می‌کند</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 border border-border rounded-2xl bg-background hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center mb-5">
                  <v.icon size={18} className="text-gold" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">مسیر رشد</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">تاریخچه کلایبرگ</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-4 sm:right-1/2 top-0 bottom-0 w-px bg-border sm:translate-x-0.5" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 pr-12 sm:pr-0 ${
                    i % 2 === 0 ? "sm:flex-row-reverse sm:pl-[calc(50%+2rem)]" : "sm:pr-[calc(50%+2rem)]"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute right-2 sm:right-1/2 sm:-translate-x-0.5 mt-1 w-5 h-5 rounded-full bg-gold border-4 border-background shrink-0" />
                  <div className="bg-card border border-border rounded-2xl p-6 flex-1">
                    <span className="text-gold text-sm font-bold">{item.year}</span>
                    <h3 className="font-bold text-foreground mt-1 mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Certificates */}
      <Section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">گواهینامه‌ها</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-14">استانداردها و افتخارات</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 max-w-xs border border-gold/30 rounded-2xl p-8 bg-background hover:border-gold/60 transition-colors"
              >
                <div className="text-4xl font-black text-gold mb-3 tracking-wider">{cert.name}</div>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <StatsSection />
      <ContactCTA />
      <div className="hidden lg:block"><Footer /></div>
    </main>
  )
}
