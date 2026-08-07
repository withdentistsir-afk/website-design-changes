"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, SlidersHorizontal, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { products, categories, type ProductCategory } from "@/lib/data"

function ProductsContent() {
  const searchParams = useSearchParams()
  const [active, setActive] = useState<ProductCategory | "all">("all")
  const [activeSub, setActiveSub] = useState<string>("all")
  const [search, setSearch] = useState("")
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  // Sync from URL query params
  useEffect(() => {
    const cat = searchParams.get("cat")
    const sub = searchParams.get("sub")
    const q = searchParams.get("search")
    if (cat && categories.some((c) => c.id === cat)) setActive(cat as ProductCategory)
    if (sub) setActiveSub(sub)
    if (q) setSearch(q)
  }, [searchParams])

  // Reset subcategory when main category changes
  const handleCatChange = (cat: ProductCategory | "all") => {
    setActive(cat)
    setActiveSub("all")
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

  return (
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
          {/* Search input */}
          <div className="relative">
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصولات ..."
              aria-label="جستجوی محصولات"
              className="w-full bg-card border border-border rounded-full py-2.5 pr-11 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-gold/60 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="پاک کردن جستجو"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {/* Main category pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />
            <button
              onClick={() => handleCatChange("all")}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === "all"
                  ? "bg-gold text-background"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              همه
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCatChange(cat.id as ProductCategory)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat.id
                    ? "bg-gold text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Subcategory pills — shown only when a category with subcategories is selected */}
          {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide pr-6">
              <button
                onClick={() => setActiveSub("all")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeSub === "all"
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                همه {activeCategory.label}
              </button>
              {activeCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeSub === sub.id
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : "border border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Count */}
          <p className="text-sm text-muted-foreground mb-8">
            {filtered.length} محصول
          </p>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <Link href={`/products/${product.id}`} className="group block">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-background/5 transition-colors duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] tracking-wider text-foreground/60 bg-background/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/30">
                        {product.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-1">{product.model}</p>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              محصولی یافت نشد
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsContent />
    </Suspense>
  )
}
