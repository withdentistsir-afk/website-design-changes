"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Search, X, SlidersHorizontal, Flame, Wind, Droplets, Square, Zap, ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { products, categories, type ProductCategory } from "@/lib/data"

const categoryIcons: Record<string, React.ElementType> = {
  hob: Flame,
  hood: Wind,
  sink: Droplets,
  oven: Square,
  microwave: Zap,
}

const categoryColors: Record<string, string> = {
  hob:       "from-orange-500/20 to-orange-400/5 border-orange-500/30 text-orange-400",
  hood:      "from-sky-500/20 to-sky-400/5 border-sky-500/30 text-sky-400",
  sink:      "from-teal-500/20 to-teal-400/5 border-teal-500/30 text-teal-400",
  oven:      "from-purple-500/20 to-purple-400/5 border-purple-500/30 text-purple-400",
  microwave: "from-rose-500/20 to-rose-400/5 border-rose-500/30 text-rose-400",
}

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.4 }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-background/10 group-hover:bg-background/0 transition-colors duration-500" />
          <div className="absolute top-2.5 right-2.5">
            <span className="text-[9px] tracking-wider text-foreground/60 bg-background/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-border/30">
              {product.categoryLabel}
            </span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mb-0.5">{product.model}</p>
        <h3 className="text-xs font-bold text-foreground group-hover:text-gold transition-colors line-clamp-1 leading-snug">
          {product.name}
        </h3>
      </Link>
    </motion.div>
  )
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [active, setActive] = useState<ProductCategory | "all">("all")
  const [activeSub, setActiveSub] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [mobileView, setMobileView] = useState<"home" | "products">("home")
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const cat = searchParams.get("cat")
    const sub = searchParams.get("sub")
    const q = searchParams.get("search")
    if (cat && categories.some((c) => c.id === cat)) {
      setActive(cat as ProductCategory)
      setMobileView("products")
    }
    if (sub) setActiveSub(sub)
    if (q) { setSearch(q); setMobileView("products") }
  }, [searchParams])

  const handleCatChange = (cat: ProductCategory | "all") => {
    setActive(cat)
    setActiveSub("all")
    setMobileView("products")
  }

  const handleSearchSubmit = (val: string) => {
    if (val.trim()) {
      setSearch(val)
      setActive("all")
      setActiveSub("all")
      setMobileView("products")
    }
  }

  const normalized = search.trim().toLowerCase()
  const filtered = products.filter((p) => {
    const matchesCat = active === "all" || p.category === active
    const matchesSub = activeSub === "all" || p.subcategory === activeSub
    const matchesSearch =
      normalized === "" ||
      [p.name, p.model, p.categoryLabel, p.description, ...p.features]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    return matchesCat && matchesSub && matchesSearch
  })

  const activeCategory = categories.find((c) => c.id === active)

  /* ─────────────────────────────────────────────
     MOBILE LAYOUT  (< lg)
  ───────────────────────────────────────────── */
  const MobileLayout = (
    <div className="flex flex-col min-h-screen bg-background pb-28">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl px-4 pt-4 pb-3 space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value) setMobileView("products")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSearchSubmit(search)
            }}
            placeholder="جستجو در محصولات ..."
            className="w-full bg-surface border border-border rounded-2xl py-3 pr-10 pl-9 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setMobileView("home") }}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* ── When products view: show category + sub filters ── */}
        {mobileView === "products" && (
          <>
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              <button
                onClick={() => { setActive("all"); setActiveSub("all") }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active === "all"
                    ? "bg-gold text-background"
                    : "bg-surface border border-border text-muted-foreground"
                }`}
              >
                همه
              </button>
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.id]
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCatChange(cat.id as ProductCategory)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      active === cat.id
                        ? "bg-gold text-background"
                        : "bg-surface border border-border text-muted-foreground"
                    }`}
                  >
                    {Icon && <Icon size={11} />}
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Subcategory pills */}
            {activeCategory && activeCategory.subcategories?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                <button
                  onClick={() => setActiveSub("all")}
                  className={`shrink-0 px-3.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    activeSub === "all"
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : "border border-border/50 text-muted-foreground"
                  }`}
                >
                  همه
                </button>
                {activeCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(sub.id)}
                    className={`shrink-0 px-3.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      activeSub === sub.id
                        ? "bg-gold/20 text-gold border border-gold/40"
                        : "border border-border/50 text-muted-foreground"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence mode="wait">

        {/* ── HOME VIEW: Category cards ── */}
        {mobileView === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex-1 px-4 pt-4 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-black text-foreground">دسته‌بندی‌ها</h1>
              <button
                onClick={() => setMobileView("products")}
                className="text-xs text-gold flex items-center gap-1"
              >
                همه محصولات
                <ChevronLeft size={12} />
              </button>
            </div>

            {/* Category grid — 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat, i) => {
                const Icon = categoryIcons[cat.id]
                const colors = categoryColors[cat.id]
                const count = products.filter((p) => p.category === cat.id).length
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleCatChange(cat.id as ProductCategory)}
                    className={`relative overflow-hidden text-right p-4 rounded-2xl border bg-gradient-to-br ${colors} flex flex-col gap-3`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-background/30`}>
                      {Icon && <Icon size={20} className="opacity-90" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground leading-tight">{cat.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{count} محصول</p>
                    </div>
                    {/* Subcategory tags */}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cat.subcategories.slice(0, 2).map((sub) => (
                          <span key={sub.id} className="text-[9px] px-2 py-0.5 rounded-full bg-background/30 text-foreground/60">
                            {sub.label.replace(cat.label, "").trim() || sub.label}
                          </span>
                        ))}
                        {cat.subcategories.length > 2 && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-background/30 text-foreground/60">
                            +{cat.subcategories.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Quick subcategory access */}
            <div className="mt-6">
              <h2 className="text-sm font-bold text-foreground mb-3">دسترسی سریع</h2>
              <div className="space-y-2">
                {categories.flatMap((cat) =>
                  cat.subcategories?.map((sub) => {
                    const Icon = categoryIcons[cat.id]
                    const count = products.filter((p) => p.category === cat.id && p.subcategory === sub.id).length
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActive(cat.id as ProductCategory)
                          setActiveSub(sub.id)
                          setMobileView("products")
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-surface border border-border/50 text-right"
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon size={14} className="text-gold" />}
                          <span className="text-sm text-foreground">{sub.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{count} مدل</span>
                          <ChevronLeft size={14} className="text-muted-foreground" />
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── PRODUCTS VIEW: grid ── */}
        {mobileView === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 px-4 pt-4"
          >
            {/* Back + count */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => { setMobileView("home"); setSearch(""); setActive("all"); setActiveSub("all") }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <ChevronLeft size={15} className="rotate-180" />
                دسته‌بندی‌ها
              </button>
              <span className="text-xs text-muted-foreground">{filtered.length} محصول</span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
                <Search size={32} className="opacity-30" />
                <p className="text-sm">محصولی یافت نشد</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )

  /* ─────────────────────────────────────────────
     DESKTOP LAYOUT  (≥ lg)
  ───────────────────────────────────────────── */
  const DesktopLayout = (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs tracking-[0.35em] font-medium uppercase">محصولات کلایبرگ</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-foreground mb-4"
          >
            همه محصولات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl leading-relaxed"
          >
            بیش از ۱۰۰ محصول در ۵ دسته‌بندی با بالاترین استانداردهای کیفیت
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصولات ..."
              className="w-full bg-card border border-border rounded-full py-2.5 pr-11 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/60 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />
            <button
              onClick={() => handleCatChange("all")}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === "all" ? "bg-gold text-background" : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              همه
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCatChange(cat.id as ProductCategory)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat.id ? "bg-gold text-background" : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide pr-6">
              <button
                onClick={() => setActiveSub("all")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeSub === "all" ? "bg-gold/20 text-gold border border-gold/40" : "border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                همه {activeCategory.label}
              </button>
              {activeCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSub === sub.id ? "bg-gold/20 text-gold border border-gold/40" : "border border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground mb-8">{filtered.length} محصول</p>
          <motion.div
            key={`${active}-${activeSub}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">محصولی یافت نشد</div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        {MobileLayout}
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        {DesktopLayout}
      </div>
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsContent />
    </Suspense>
  )
}
