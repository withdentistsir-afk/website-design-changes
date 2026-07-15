"use client"

import { useRef, useState, useEffect, useId } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowLeft, Clock, TrendingUp, ChevronLeft } from "lucide-react"
import { products, categories, type Product, type ProductCategory } from "@/lib/data"

const POPULAR_SEARCHES = ["هود شومینه‌ای", "اجاق گاز شیشه‌ای", "سینک گرانیتی", "فر توکار", "هود مخفی"]

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  hood: "🌬",
  hob: "🔥",
  sink: "💧",
  oven: "⬜",
  microwave: "⚡",
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-transparent text-gold font-bold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

export function HeroSearch() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all")
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  // Load recent searches from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("ks_recent")
      if (stored) setRecentSearches(JSON.parse(stored))
    } catch {}
  }, [])

  // Close on outside click
  useEffect(() => {
    function onPointer(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener("pointerdown", onPointer)
    return () => document.removeEventListener("pointerdown", onPointer)
  }, [])

  // Compute live results
  const normalized = query.trim().toLowerCase()
  const results: Product[] = normalized
    ? products
        .filter((p) => {
          const matchesCat = activeCategory === "all" || p.category === activeCategory
          const matchesQuery = [p.name, p.model, p.categoryLabel, p.description, ...p.features]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
          return matchesCat && matchesQuery
        })
        .slice(0, 5)
    : []

  const showDropdown = open || focused

  function saveRecent(term: string) {
    const updated = [term, ...recentSearches.filter((r) => r !== term)].slice(0, 4)
    setRecentSearches(updated)
    try { sessionStorage.setItem("ks_recent", JSON.stringify(updated)) } catch {}
  }

  function navigate(term: string, productId?: string) {
    saveRecent(term)
    setOpen(false)
    setFocused(false)
    if (productId) {
      router.push(`/products/${productId}`)
    } else {
      const cat = activeCategory !== "all" ? `&cat=${activeCategory}` : ""
      router.push(term ? `/products?search=${encodeURIComponent(term)}${cat}` : "/products")
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate(query.trim())
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (!showDropdown) return

    const items = results.length
      ? results
      : recentSearches.length
      ? recentSearches
      : POPULAR_SEARCHES

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, items.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      const item = results.length ? results[activeIndex] : (items as string[])[activeIndex]
      if (typeof item === "string") {
        setQuery(item)
        navigate(item)
      } else {
        navigate((item as Product).name, (item as Product).id)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
      setFocused(false)
      inputRef.current?.blur()
    }
  }

  function clearQuery() {
    setQuery("")
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto relative z-50" role="search">
      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide sm:justify-center px-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
            activeCategory === "all"
              ? "bg-gold text-background border-gold"
              : "border-foreground/20 text-foreground/60 hover:border-foreground/50 hover:text-foreground/90 bg-transparent"
          }`}
        >
          همه
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as ProductCategory)}
            className={`shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
              activeCategory === cat.id
                ? "bg-gold text-background border-gold"
                : "border-foreground/20 text-foreground/60 hover:border-foreground/50 hover:text-foreground/90 bg-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Search input */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.7 }}
      >
        <div
          className={`flex items-center gap-2 sm:gap-3 bg-card/85 backdrop-blur-2xl border rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-2xl transition-all duration-300 ${
            focused || open ? "border-gold/60 shadow-[0_0_0_3px_rgba(86,181,190,0.12)]" : "border-white/10"
          }`}
        >
          <Search
            size={18}
            className={`shrink-0 transition-colors duration-200 ${focused ? "text-gold" : "text-muted-foreground"}`}
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            aria-controls={listboxId}
            aria-activedescendant={activeIndex >= 0 ? `ks-item-${activeIndex}` : undefined}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); setOpen(true) }}
            onFocus={() => { setFocused(true); setOpen(true) }}
            onKeyDown={handleKeyDown}
            placeholder="جستجوی محصول یا مدل ..."
            aria-label="جستجوی محصولات"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none py-1 min-w-0"
            autoComplete="off"
            spellCheck={false}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={clearQuery}
                aria-label="پاک کردن جستجو"
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 text-muted-foreground transition-colors"
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
          {/* Mobile: icon-only button / Desktop: text button */}
          <button
            type="submit"
            aria-label="جستجو"
            className="shrink-0 sm:hidden w-9 h-9 flex items-center justify-center bg-gold text-background rounded-xl hover:bg-gold-light active:scale-95 transition-all duration-200"
          >
            <Search size={16} />
          </button>
          <button
            type="submit"
            className="shrink-0 hidden sm:flex px-5 py-2.5 bg-gold text-background font-semibold text-sm rounded-xl hover:bg-gold-light active:scale-95 transition-all duration-200"
          >
            جستجو
          </button>
        </div>
      </motion.form>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Live results */}
            {results.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase px-4 pt-3 pb-1">
                  نتایج
                </p>
                {results.map((product, i) => (
                  <button
                    key={product.id}
                    id={`ks-item-${i}`}
                    role="option"
                    aria-selected={activeIndex === i}
                    onClick={() => navigate(product.name, product.id)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-right ${
                      activeIndex === i ? "bg-gold/10" : "hover:bg-foreground/5"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-background/50 overflow-hidden shrink-0 border border-border">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm text-foreground truncate">
                        {highlight(product.name, normalized)}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {product.categoryLabel} · {product.model}
                      </p>
                    </div>
                    <ChevronLeft size={14} className="text-muted-foreground shrink-0" />
                  </button>
                ))}
                <button
                  onClick={() => navigate(query)}
                  className="w-full flex items-center justify-between px-4 py-3 border-t border-border hover:bg-foreground/5 transition-colors text-right"
                >
                  <span className="text-xs text-gold font-medium">مشاهده همه نتایج</span>
                  <ArrowLeft size={13} className="text-gold" />
                </button>
              </div>
            )}

            {/* No results */}
            {normalized && results.length === 0 && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">نتیجه‌ای یافت نشد</p>
                <p className="text-xs text-muted-foreground/60">ع��ارت دیگری امتحان کنید</p>
              </div>
            )}

            {/* Empty state: recents + trending */}
            {!normalized && (
              <div className="py-2">
                {recentSearches.length > 0 && (
                  <>
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase px-4 pt-2 pb-1 flex items-center gap-1.5">
                      <Clock size={11} /> جستجوهای اخیر
                    </p>
                    {recentSearches.map((term, i) => (
                      <button
                        key={term}
                        id={`ks-item-${i}`}
                        role="option"
                        aria-selected={activeIndex === i}
                        onClick={() => { setQuery(term); navigate(term) }}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-right transition-colors ${
                          activeIndex === i ? "bg-gold/10" : "hover:bg-foreground/5"
                        }`}
                      >
                        <span className="text-sm text-foreground/80">{term}</span>
                        <X
                          size={13}
                          className="text-muted-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            const updated = recentSearches.filter((r) => r !== term)
                            setRecentSearches(updated)
                            try { sessionStorage.setItem("ks_recent", JSON.stringify(updated)) } catch {}
                          }}
                        />
                      </button>
                    ))}
                    <div className="mx-4 my-2 h-px bg-border" />
                  </>
                )}
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase px-4 pt-1 pb-1 flex items-center gap-1.5">
                  <TrendingUp size={11} /> جستجوهای محبوب
                </p>
                {POPULAR_SEARCHES.map((term, i) => {
                  const idx = (recentSearches.length > 0 ? recentSearches.length + 1 : 0) + i
                  return (
                    <button
                      key={term}
                      id={`ks-item-${idx}`}
                      role="option"
                      aria-selected={activeIndex === idx}
                      onClick={() => { setQuery(term); navigate(term) }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-right transition-colors ${
                        activeIndex === idx ? "bg-gold/10" : "hover:bg-foreground/5"
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gold/10 text-gold text-[11px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground/80">{term}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-[11px] text-foreground/35 mt-4 text-center"
      >
        بیش از ۱۰۰ محصول در ۵ دسته‌بندی — هود · اجاق گاز · سینک · فر · ماکروویو
      </motion.p>
    </div>
  )
}
