"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Search, X, SlidersHorizontal, Flame, Wind, Droplets, Square, Zap, ChevronLeft, ArrowRight } from "lucide-react"
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

const categoryColors: Record<string, { gradient: string; icon: string; border: string }> = {
  hob:       { gradient: "from-orange-500/25 via-orange-400/10 to-transparent", icon: "text-orange-400", border: "border-orange-500/25" },
  hood:      { gradient: "from-sky-500/25 via-sky-400/10 to-transparent",    icon: "text-sky-400",    border: "border-sky-500/25" },
  sink:      { gradient: "from-teal-500/25 via-teal-400/10 to-transparent",  icon: "text-teal-400",  border: "border-teal-500/25" },
  oven:      { gradient: "from-purple-500/25 via-purple-400/10 to-transparent", icon: "text-purple-400", border: "border-purple-500/25" },
  microwave: { gradient: "from-rose-500/25 via-rose-400/10 to-transparent",  icon: "text-rose-400",  border: "border-rose-500/25" },
}

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface mb-2.5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-background/10 group-hover:bg-background/0 transition-colors duration-500" />
          <div className="absolute top-2 right-2">
            <span className="text-[9px] tracking-wider text-foreground/70 bg-background/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-border/30">
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
  const [active, setActive] = useState<ProductCategory | "all">("all")
  const [activeSub, setActiveSub] = useState<string>("all")
  const [search, setSearch] = useState("")
  // "home" = search screen, "products" = product list (entered from category)
  const [mobileView, setMobileView] = useState<"home" | "products">("home")
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const cat = searchParams.get("cat")
    const sub = searchParams.get("sub")
    const q = searchParams.get("search")
    const home = searchParams.get("home")

    // ?home=1 → always reset to home view
    if (home === "1") {
      setMobileView("home")
      setActive("all")
      setActiveSub("all")
      setSearch("")
      return
    }

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
  // "entered from category" = not a text search result
  const isInsideCategory = mobileView === "products" && active !== "all" && !search.trim()

  /* ─────────────────────────────────────────────
     MOBILE LAYOUT  (< lg)
  ───────────────────────────────────────────── */
  const MobileLayout = (
    <div className="flex flex-col min-h-screen bg-background pb-28">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl">

        {/* HOME VIEW top bar: logo + search */}
        {mobileView === "home" && (
          <div className="px-4 pt-5 pb-3 space-y-3">
            {/* Logo row */}
            <div className="flex items-center justify-between">
              <Image
                src="/images/clayberg-logo.png"
                alt="کلایبرگ"
                width={110}
                height={36}
                className="object-contain"
                priority
              />
              <span className="text-[10px] text-muted-foreground">لوازم آشپزخانه</span>
            </div>
            {/* Search bar */}
            <div className="relative">
              <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  if (e.target.value) { setActive("all"); setActiveSub("all"); setMobileView("products") }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && search.trim()) {
                    setActive("all"); setActiveSub("all"); setMobileView("products")
                  }
                }}
                placeholder="جستجو در محصولات ..."
                className="w-full bg-surface border border-border rounded-2xl py-3 pr-10 pl-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>
        )}

        {/* PRODUCTS VIEW top bar: back + title + (search if text search) */}
        {mobileView === "products" && (
          <div className="px-4 pt-4 pb-3 space-y-3">
            {/* Back row */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => { setMobileView("home"); setSearch(""); setActive("all"); setActiveSub("all") }}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <ArrowRight size={16} />
                {isInsideCategory ? activeCategory?.label : "نتایج جستجو"}
              </button>
              <span className="text-xs text-muted-foreground">{filtered.length} محصول</span>
            </div>

            {/* If text search: show search bar with clear */}
            {!isInsideCategory && (
              <div className="relative">
                <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    if (!e.target.value) { setMobileView("home") }
                  }}
                  placeholder="جستجو در محصولات ..."
                  className="w-full bg-surface border border-border rounded-2xl py-2.5 pr-10 pl-9 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/50 transition-colors"
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
            )}

            {/* Subcategory filter — ONLY inside a category, as a wrap grid (no scroll) */}
            {isInsideCategory && activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-0.5">
                <button
                  onClick={() => setActiveSub("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeSub === "all"
                      ? "bg-gold text-background"
                      : "bg-surface border border-border text-muted-foreground"
                  }`}
                >
                  همه
                </button>
                {activeCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(sub.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeSub === sub.id
                        ? "bg-gold text-background"
                        : "bg-surface border border-border text-muted-foreground"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Separator line */}
        <div className="gold-line" />
      </div>

      <AnimatePresence mode="wait">

        {/* ── HOME VIEW ── */}
        {mobileView === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
            className="flex-1 px-4 pt-4"
          >
            {/* Hero background strip */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/hero-kitchen.png"
                alt="کلایبرگ"
                fill
                className="object-cover"
                sizes="(max-width: 460px) 460px"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-end px-5">
                <p className="text-[11px] text-gold tracking-widest uppercase mb-1">Klaiberg</p>
                <h2 className="text-xl font-black text-foreground text-right leading-tight">لوازم آشپزخانه</h2>
                <p className="text-xs text-muted-foreground mt-1">کیفیت، اعتماد، نوآوری</p>
              </div>
            </div>

            {/* Category cards */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat, i) => {
                const Icon = categoryIcons[cat.id]
                const colors = categoryColors[cat.id]
                const count = products.filter((p) => p.category === cat.id).length
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleCatChange(cat.id as ProductCategory)}
                    className={`relative overflow-hidden text-right p-4 rounded-2xl border bg-gradient-to-br ${colors.gradient} ${colors.border} flex flex-col gap-3 active:scale-95 transition-transform`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background/30 backdrop-blur-sm">
                      {Icon && <Icon size={20} className={colors.icon} />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground leading-tight">{cat.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{count} محصول</p>
                    </div>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
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
          </motion.div>
        )}

        {/* ── PRODUCTS VIEW ── */}
        {mobileView === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="flex-1 px-4 pt-4"
          >
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
              onClick={() => { setActive("all"); setActiveSub("all") }}
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
      <div className="lg:hidden">{MobileLayout}</div>
      <div className="hidden lg:block">{DesktopLayout}</div>
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
