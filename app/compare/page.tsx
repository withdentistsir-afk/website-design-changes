"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, ChevronDown, Check, Minus, ArrowLeft, Search, SlidersHorizontal } from "lucide-react"
import { products, categories } from "@/lib/data"
import type { Product } from "@/lib/data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const MAX_COMPARE = 3

const ALL_SPEC_KEYS = [
  "سایز",
  "قدرت مکش",
  "موتور",
  "فیلتر",
  "صدا",
  "لامپ",
  "روغن‌گیر",
  "سنسور",
  "بست",
  "تعداد شعله",
  "بدنه",
  "نوع سرشعله",
  "توان پلوپز",
  "مقاومت حرارتی",
  "شبکه",
  "ترموکوبل",
  "بوبین",
  "عمق",
  "ضخامت",
  "جنس",
  "نوع نصب",
  "عمق لگن",
  "ضمانت",
  "برنامه پخت",
  "حجم محفظه",
  "در",
  "کلاس انرژی",
  "تنظیم دما",
]

function getRelevantSpecKeys(selected: Product[]): string[] {
  const keys = new Set<string>()
  selected.forEach((p) => Object.keys(p.specs).forEach((k) => keys.add(k)))
  return ALL_SPEC_KEYS.filter((k) => keys.has(k))
}

function ProductPickerModal({
  onSelect,
  onClose,
  excluded,
}: {
  onSelect: (p: Product) => void
  onClose: () => void
  excluded: string[]
}) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory
    const matchSearch =
      !search ||
      p.name.includes(search) ||
      p.model.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.includes(search)
    const notExcluded = !excluded.includes(p.id)
    return matchCat && matchSearch && notExcluded
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="font-bold text-foreground text-lg">انتخاب محصول برای مقایسه</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 pt-4 pb-3">
          <div className="relative">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl pr-10 pl-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
              autoFocus
            />
          </div>
        </div>

        <div className="flex gap-2 px-6 pb-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gold text-background"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            همه
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-gold text-background"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto max-h-80 px-4 pb-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">محصولی یافت نشد</div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelect(p)
                    onClose()
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-gold hover:bg-surface transition-all duration-200 text-right group"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-2 shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground">{p.categoryLabel}</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors leading-tight truncate">
                      {p.model}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{p.name.replace(p.model, "").trim()}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function EmptySlot({ onClick, index }: { onClick: () => void; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border hover:border-gold rounded-2xl min-h-[420px] transition-all duration-300 hover:bg-surface/50"
    >
      <div className="w-14 h-14 rounded-full border-2 border-dashed border-border group-hover:border-gold flex items-center justify-center transition-colors duration-300">
        <Plus size={22} className="text-muted-foreground group-hover:text-gold transition-colors duration-300" />
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-gold transition-colors duration-300 font-medium">
        افزودن محصول
      </span>
    </motion.button>
  )
}

function ProductColumn({
  product,
  onRemove,
  index,
}: {
  product: Product
  onRemove: () => void
  index: number
}) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col border border-border rounded-2xl overflow-hidden bg-card"
    >
      <button
        onClick={onRemove}
        className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        aria-label="حذف محصول"
      >
        <X size={13} />
      </button>

      <div className="relative aspect-square bg-surface">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-4">
          <span className="text-[10px] tracking-widest text-foreground/60 bg-background/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/40">
            {product.categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <p className="text-xs text-muted-foreground mb-1">{product.model}</p>
        <h3 className="font-bold text-foreground text-sm leading-snug">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-1.5 text-gold text-xs mt-3 hover:gap-2.5 transition-all duration-300"
        >
          مشاهده محصول
          <ArrowLeft size={11} />
        </Link>
      </div>
    </motion.div>
  )
}

export default function ComparePage() {
  const [selected, setSelected] = useState<Product[]>([])
  const [pickerOpen, setPickerOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    specs: true,
    features: true,
  })

  const addProduct = (p: Product) => {
    if (selected.length < MAX_COMPARE) {
      setSelected((prev) => [...prev, p])
    }
  }

  const removeProduct = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id))
  }

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const specKeys = getRelevantSpecKeys(selected)
  const allFeatures = Array.from(new Set(selected.flatMap((p) => p.features)))
  const emptySlots = MAX_COMPARE - selected.length

  return (
    <main className="min-h-screen bg-background">
      <div className="hidden lg:block"><Navbar /></div>

      {/* Page Header */}
      <section className="pt-36 pb-12 px-6 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">مقایسه هوشمند</span>
            <span className="w-8 h-px bg-gold" />
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-4xl font-black text-foreground"
              >
                مقایسه محصولات
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-muted-foreground text-sm mt-2 leading-relaxed"
              >
                تا ۳ محصول را انتخاب کنید و مشخصات فنی و ویژگی‌های آن‌ها را کنار هم بررسی کنید
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {selected.length < MAX_COMPARE && (
                <button
                  onClick={() => setPickerOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gold text-background rounded-full text-sm font-semibold hover:bg-gold/90 transition-colors"
                >
                  <Plus size={15} />
                  افزودن محصول
                </button>
              )}
              {selected.length > 0 && (
                <button
                  onClick={() => setSelected([])}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground rounded-full text-sm transition-colors"
                >
                  <X size={14} />
                  پاک کردن
                </button>
              )}
            </motion.div>
          </div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3 mt-8"
          >
            {Array.from({ length: MAX_COMPARE }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < selected.length
                      ? "border-gold bg-gold text-background"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {i < selected.length ? <Check size={14} /> : i + 1}
                </div>
                {i < MAX_COMPARE - 1 && (
                  <div
                    className={`h-px w-8 transition-colors duration-300 ${
                      i < selected.length - 1 ? "bg-gold" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
            <span className="text-xs text-muted-foreground mr-2">
              {selected.length} از {MAX_COMPARE} محصول انتخاب شده
            </span>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Columns grid */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <AnimatePresence mode="popLayout">
              {selected.map((p, i) => (
                <ProductColumn key={p.id} product={p} onRemove={() => removeProduct(p.id)} index={i} />
              ))}
            </AnimatePresence>
            {Array.from({ length: emptySlots }).map((_, i) => (
              <EmptySlot key={`empty-${i}`} onClick={() => setPickerOpen(true)} index={selected.length + i} />
            ))}
          </div>

          {/* Comparison tables */}
          <AnimatePresence>
            {selected.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal size={16} className="text-gold" />
                  <span className="text-sm font-bold text-foreground">جدول مقایسه</span>
                  <span className="text-xs text-muted-foreground">({selected.length} محصول انتخا�� شده)</span>
                </div>

                {/* Specs table */}
                {specKeys.length > 0 && (
                  <div className="border border-border rounded-2xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 bg-surface hover:bg-surface-2 transition-colors"
                      onClick={() => toggleSection("specs")}
                    >
                      <span className="font-bold text-foreground text-sm">مشخصات فنی</span>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform duration-300 ${
                          expandedSections.specs ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.specs && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-t border-border">
                                  <th className="px-6 py-3 text-right text-xs text-muted-foreground font-medium bg-card w-1/4 min-w-[120px]">
                                    ویژگی
                                  </th>
                                  {selected.map((p) => (
                                    <th
                                      key={p.id}
                                      className="px-4 py-3 text-center text-xs text-gold font-semibold bg-card border-r border-border min-w-[160px]"
                                    >
                                      {p.model}
                                    </th>
                                  ))}
                                  {Array.from({ length: emptySlots }).map((_, i) => (
                                    <th key={`empty-th-${i}`} className="px-4 py-3 bg-card border-r border-border min-w-[160px]" />
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {specKeys.map((key, idx) => (
                                  <tr
                                    key={key}
                                    className={`border-t border-border ${
                                      idx % 2 === 0 ? "bg-background" : "bg-surface/30"
                                    }`}
                                  >
                                    <td className="px-6 py-3 text-xs text-muted-foreground font-medium">{key}</td>
                                    {selected.map((p) => (
                                      <td
                                        key={p.id}
                                        className="px-4 py-3 text-center text-xs text-foreground border-r border-border"
                                      >
                                        {p.specs[key] ?? (
                                          <span className="text-muted-foreground/40">
                                            <Minus size={12} className="mx-auto" />
                                          </span>
                                        )}
                                      </td>
                                    ))}
                                    {Array.from({ length: emptySlots }).map((_, i) => (
                                      <td key={`empty-td-${i}`} className="px-4 py-3 border-r border-border" />
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Features table */}
                {allFeatures.length > 0 && (
                  <div className="border border-border rounded-2xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 bg-surface hover:bg-surface-2 transition-colors"
                      onClick={() => toggleSection("features")}
                    >
                      <span className="font-bold text-foreground text-sm">ویژگی‌ها و امکانات</span>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform duration-300 ${
                          expandedSections.features ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.features && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-t border-border">
                                  <th className="px-6 py-3 text-right text-xs text-muted-foreground font-medium bg-card w-1/4 min-w-[120px]">
                                    ویژگی
                                  </th>
                                  {selected.map((p) => (
                                    <th
                                      key={p.id}
                                      className="px-4 py-3 text-center text-xs text-gold font-semibold bg-card border-r border-border min-w-[160px]"
                                    >
                                      {p.model}
                                    </th>
                                  ))}
                                  {Array.from({ length: emptySlots }).map((_, i) => (
                                    <th key={`empty-fth-${i}`} className="px-4 py-3 bg-card border-r border-border min-w-[160px]" />
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {allFeatures.map((feature, idx) => (
                                  <tr
                                    key={feature}
                                    className={`border-t border-border ${
                                      idx % 2 === 0 ? "bg-background" : "bg-surface/30"
                                    }`}
                                  >
                                    <td className="px-6 py-3 text-xs text-muted-foreground font-medium">{feature}</td>
                                    {selected.map((p) => (
                                      <td key={p.id} className="px-4 py-3 text-center border-r border-border">
                                        {p.features.includes(feature) ? (
                                          <Check size={14} className="mx-auto text-gold" />
                                        ) : (
                                          <Minus size={14} className="mx-auto text-muted-foreground/30" />
                                        )}
                                      </td>
                                    ))}
                                    {Array.from({ length: emptySlots }).map((_, i) => (
                                      <td key={`empty-ftd-${i}`} className="px-4 py-3 border-r border-border" />
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {selected.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-muted-foreground text-sm"
            >
              برای شروع مقایسه، روی خانه‌های بالا کلیک کنید یا دکمه «افزودن محصول» را بزنید
            </motion.div>
          )}

          {selected.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 text-muted-foreground text-sm"
            >
              حداقل یک محصول دیگر اضافه کنید تا جدول مقایسه نمایش داده شود
            </motion.div>
          )}
        </div>
      </section>

      <div className="hidden lg:block"><Footer /></div>

      <AnimatePresence>
        {pickerOpen && (
          <ProductPickerModal
            onSelect={addProduct}
            onClose={() => setPickerOpen(false)}
            excluded={selected.map((p) => p.id)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
