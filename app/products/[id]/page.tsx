"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getProductById, getProductsByCategory, products } from "@/lib/data"

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const product = getProductById(id)

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">محصول یافت نشد</p>
          <Link href="/products" className="text-gold underline">بازگشت به محصولات</Link>
        </div>
      </main>
    )
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      <div className="hidden lg:block"><Navbar /></div>

      {/* Breadcrumb */}
      <div className="pt-28 px-6 pb-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">خانه</Link>
            <ChevronLeft size={12} />
            <Link href="/products" className="hover:text-foreground transition-colors">محصولات</Link>
            <ChevronLeft size={12} />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-28"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {/* Category badge */}
              <span className="inline-block text-xs text-gold border border-gold/40 px-3 py-1 rounded-full mb-4 tracking-wider">
                {product.categoryLabel}
              </span>

              <p className="text-sm text-muted-foreground mb-1">{product.model}</p>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 text-balance">
                {product.name}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs text-muted-foreground mb-3 tracking-wider">رنگ‌بندی موجود</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="text-xs border border-border px-3 py-1.5 rounded-full text-foreground/70">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-8">
                <p className="text-xs text-muted-foreground mb-4 tracking-wider uppercase">ویژگی‌ها</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 size={13} className="text-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="gold-line mb-8" />

              {/* Specs */}
              <div className="mb-10">
                <p className="text-xs text-muted-foreground mb-4 tracking-wider uppercase">مشخصات فنی</p>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-muted-foreground shrink-0">{key}</span>
                      <span className="text-foreground text-left" dir="ltr">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty */}
              {product.warranty && (
                <div className="bg-surface border border-border rounded-xl p-4 mb-8">
                  <p className="text-sm text-foreground/80">{product.warranty}</p>
                </div>
              )}

              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-8">
                <p className="text-sm text-gold/80">
                  ۲ سال ضمانت و ۱۰ سال گارانتی قطعات اصلی
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-3 w-full py-4 bg-gold text-background font-semibold text-sm rounded-full hover:bg-gold-light transition-all duration-300"
              >
                استعلام قیمت
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 px-6 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-foreground">محصولات مشابه</h2>
              <Link href={`/products?cat=${product.category}`} className="flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all">
                مشاهده همه
                <ChevronLeft size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/products/${p.id}`} className="group block">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-surface mb-3">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-0.5">{p.model}</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
                      {p.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="hidden lg:block"><Footer /></div>
    </main>
  )
}
