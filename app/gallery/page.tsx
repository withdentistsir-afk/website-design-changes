"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const tabs = ["همه", "محصولات", "کارخانه", "نصب"]

const galleryItems = [
  { src: "/images/gallery/hood-1.jpg", alt: "هود شومینه‌ای کلایبرگ", cat: "محصولات" },
  { src: "/images/gallery/hood-2.jpg", alt: "هود مخفی کلایبرگ", cat: "محصولات" },
  { src: "/images/gallery/hob-1.jpg", alt: "اجاق گاز شیشه‌ای", cat: "محصولات" },
  { src: "/images/gallery/sink-1.jpg", alt: "سینک دست‌ساز کلایبرگ", cat: "محصولات" },
  { src: "/images/gallery/oven-1.jpg", alt: "فر توکار کلایبرگ", cat: "محصولات" },
  { src: "/images/gallery/factory-1.jpg", alt: "خط تولید کلایبرگ", cat: "کارخانه" },
  { src: "/images/gallery/factory-2.jpg", alt: "کنترل کیفیت", cat: "کارخانه" },
  { src: "/images/gallery/factory-3.jpg", alt: "کارخانه کلایبرگ", cat: "کارخانه" },
  { src: "/images/gallery/install-1.jpg", alt: "نصب هود در آشپزخانه", cat: "نصب" },
  { src: "/images/gallery/install-2.jpg", alt: "نصب اجاق گاز توکار", cat: "نصب" },
  { src: "/images/gallery/hob-2.jpg", alt: "صفحه گاز استیل", cat: "محصولات" },
  { src: "/images/gallery/sink-2.jpg", alt: "سینک گرانیتی", cat: "محصولات" },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("همه")
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const filtered =
    activeTab === "همه" ? galleryItems : galleryItems.filter((g) => g.cat === activeTab)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 border-b border-border" ref={headerRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">گالری</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-foreground"
          >
            تصاویر کلایبرگ
          </motion.h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gold text-background"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setLightbox(item)}
                  className="group relative block w-full rounded-2xl overflow-hidden cursor-zoom-in"
                  aria-label={`بزرگ‌نمایی: ${item.alt}`}
                >
                  <div className={`relative w-full ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn size={28} className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-cover" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                aria-label="بستن"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-background/60 backdrop-blur-sm p-4">
                <p className="text-sm text-foreground/80">{lightbox.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
