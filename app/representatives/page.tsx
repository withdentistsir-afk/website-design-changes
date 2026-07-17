"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Smartphone, MapPin, Building2, ChevronDown, Users, Send, User, Mail, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { provinceRepresentatives } from "@/lib/data"

export default function RepresentativesPage() {
  const [openProvince, setOpenProvince] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", city: "", phone: "", email: "", description: "" })
  const [submitted, setSubmitted] = useState(false)

  const totalReps = provinceRepresentatives.reduce((acc, p) => acc + p.representatives.length, 0)
  const coveredProvinces = provinceRepresentatives.filter((p) => p.representatives.length > 0).length
  const activeProvinces = provinceRepresentatives.filter((p) => p.representatives.length > 0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background font-sans" dir="rtl">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-medium uppercase">Network</span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 text-balance">
            شبکه نمایندگان کلایبرگ
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            نمایندگان مجاز کلایبرگ در سراسر کشور و امکان درخواست نمایندگی در شهر شما.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-2xl font-black text-gold">{totalReps}+</p>
              <p className="text-xs text-foreground/50 mt-1">نمایندگی فعال</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-gold">{coveredProvinces}</p>
              <p className="text-xs text-foreground/50 mt-1">استان پوشش‌داده‌شده</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-gold">۳۱</p>
              <p className="text-xs text-foreground/50 mt-1">استان کشور</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content: Representatives list + Request form */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Representatives list */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <Users size={16} className="text-gold" />
              </div>
              <h2 className="text-sm font-bold text-foreground">لیست نمایندگان</h2>
            </div>

            <div className="divide-y divide-border max-h-[620px] overflow-y-auto">
              {activeProvinces.length === 0 ? (
                <div className="py-16 text-center">
                  <Users size={36} className="mx-auto text-foreground/20 mb-3" />
                  <p className="text-sm text-foreground/50">هنوز نمایندگی‌ای ثبت نشده است.</p>
                </div>
              ) : (
                activeProvinces.map((province) => (
                  <div key={province.isoCode}>
                    {/* Province header — accordion toggle */}
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface transition-colors group"
                      onClick={() =>
                        setOpenProvince(openProvince === province.isoCode ? null : province.isoCode)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <MapPin size={15} className="text-gold shrink-0" />
                        <span className="text-sm font-semibold text-foreground">{province.provinceName}</span>
                        <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                          {province.representatives.length} نماینده
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-foreground/40 transition-transform duration-200 ${
                          openProvince === province.isoCode ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Representatives */}
                    <AnimatePresence initial={false}>
                      {openProvince === province.isoCode && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 flex flex-col gap-3">
                            {province.representatives.map((rep, i) => (
                              <motion.div
                                key={rep.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-background/50 border border-border rounded-xl p-4 flex flex-col gap-3"
                              >
                                <div className="flex items-start gap-2">
                                  <Building2 size={14} className="text-gold mt-0.5 shrink-0" />
                                  <div>
                                    <p className="text-sm font-bold text-foreground leading-snug">{rep.name}</p>
                                    <p className="text-xs text-gold mt-0.5">{rep.company}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin size={12} className="text-foreground/40 mt-0.5 shrink-0" />
                                  <p className="text-xs text-foreground/60 leading-relaxed">{rep.address}</p>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <a
                                    href={`tel:${rep.phone}`}
                                    className="flex items-center gap-2 text-xs text-foreground/70 hover:text-gold transition-colors"
                                  >
                                    <Phone size={12} className="shrink-0" />
                                    <span dir="ltr">{rep.phone}</span>
                                  </a>
                                  {rep.mobile && (
                                    <a
                                      href={`tel:${rep.mobile}`}
                                      className="flex items-center gap-2 text-xs text-foreground/70 hover:text-gold transition-colors"
                                    >
                                      <Smartphone size={12} className="shrink-0" />
                                      <span dir="ltr">{rep.mobile}</span>
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Request form */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl sticky top-28">
            <div className="p-5 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <Send size={15} className="text-gold" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">درخواست نمایندگی</h2>
                <p className="text-xs text-foreground/50 mt-0.5">فرم را تکمیل کنید تا با شما تماس بگیریم</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-gold" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">درخواست شما ثبت شد</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    کارشناسان کلایبرگ در اسرع وقت با شما تماس خواهند گرفت.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", city: "", phone: "", email: "", description: "" }) }}
                    className="mt-6 text-xs text-gold hover:underline"
                  >
                    ثبت درخواست جدید
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="p-5 flex flex-col gap-4"
                >
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-foreground/70 flex items-center gap-1.5">
                      <User size={12} className="text-gold" />
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="نام کامل خود را وارد کنید"
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-foreground/70 flex items-center gap-1.5">
                      <MapPin size={12} className="text-gold" />
                      شهر / استان
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="مثلاً تهران، اصفهان ..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>

                  {/* Phone + Email row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-foreground/70 flex items-center gap-1.5">
                        <Phone size={12} className="text-gold" />
                        شماره تماس
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="09xxxxxxxxx"
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-gold/60 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-foreground/70 flex items-center gap-1.5">
                        <Mail size={12} className="text-gold" />
                        ایمیل
                      </label>
                      <input
                        type="email"
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-gold/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-foreground/70 flex items-center gap-1.5">
                      <FileText size={12} className="text-gold" />
                      توضیحات
                    </label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="سابقه فعالیت، انگیزه و سایر اطلاعات مرتبط ..."
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-gold/60 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gold text-background font-bold text-sm rounded-xl hover:bg-gold-light active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    ارسال درخواست
                  </button>

                  <p className="text-xs text-foreground/40 text-center leading-relaxed">
                    اطلاعات شما محرمانه بوده و فقط برای بررسی درخواست نمایندگی استفاده می‌شود.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
