"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const contactItems = [
  {
    icon: Phone,
    title: "تلفن",
    lines: ["۰۲۱-۳۳۲۸۵۱۸۱"],
  },
  {
    icon: Mail,
    title: "ایمیل",
    lines: ["info@clayberg.ir"],
  },
  {
    icon: MapPin,
    title: "آدرس",
    lines: ["شهرک صنعتی خاوران"],
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    lines: ["شنبه تا چهارشنبه: ۸ تا ۱۷", "پنج‌شنبه: ۸ تا ۱۳"],
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="hidden lg:block"><Navbar /></div>

      {/* Header */}
      <section className="pt-36 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">ارتباط با ما</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-foreground"
          >
            تماس با کلایبرگ
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-black text-foreground mb-8">اطلاعات تماس</h2>
              <div className="space-y-6">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{item.title}</p>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-foreground">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 rounded-2xl overflow-hidden border border-border aspect-video bg-surface flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">نقشه موقعیت</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-black text-foreground mb-8">ارسال پیام</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gold/10 border border-gold/30 rounded-2xl p-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Send size={22} className="text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">پیام شما ارسال شد</h3>
                  <p className="text-sm text-muted-foreground">به زودی با شما تماس خواهیم گرفت.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">نام و نام خانوادگی *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
                        placeholder="نام خود را وارد کنید"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">شماره تماس *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
                        placeholder="۰۹۱۲XXXXXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">ایمیل</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">موضوع *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">انتخاب موضوع</option>
                      <option value="product">استعلام محصول</option>
                      <option value="support">خدمات پس از فروش</option>
                      <option value="dealer">نمایندگی</option>
                      <option value="other">سایر</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">پیام *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors resize-none"
                      placeholder="پیام خود را بنویسید..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-background font-semibold text-sm rounded-full hover:bg-gold-light transition-colors duration-300"
                  >
                    ارسال پیام
                    <Send size={15} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="hidden lg:block"><Footer /></div>
    </main>
  )
}
