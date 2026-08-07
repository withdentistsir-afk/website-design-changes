"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { href: "/", label: "صفحه اصلی" },
  {
    href: "/products",
    label: "محصولات",
    children: [
      { href: "/products?cat=hood", label: "هود آشپزخانه" },
      { href: "/products?cat=hob", label: "اجاق گاز" },
      { href: "/products?cat=sink", label: "سینک آشپزخانه" },
      { href: "/products?cat=oven", label: "فر توکار" },
      { href: "/products?cat=microwave", label: "ماکروویو" },
    ],
  },
  { href: "/about", label: "خدمات" },
  { href: "/about", label: "درباره ما" },
  { href: "/representatives", label: "نمایندگان" },
  { href: "/compare", label: "مقایسه محصولات" },
  { href: "/gallery", label: "مقالات" },
  { href: "/contact", label: "تماس با ما" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile: hamburger */}
            <button
              className="lg:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="منوی موبایل"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-sm">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href + link.label} className="relative group">
                    <button
                      className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors font-medium"
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      {link.label}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-3 w-52 bg-card border border-border rounded-xl shadow-2xl py-2 z-50"
                          onMouseEnter={() => setMegaOpen(true)}
                          onMouseLeave={() => setMegaOpen(false)}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-surface transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="px-5 py-2.5 text-sm font-medium border border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300 rounded-full"
              >
                ثبت درخواست
              </Link>
            </div>

            {/* Mobile spacer */}
            <div className="lg:hidden w-8" />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex flex-col h-full px-6 pt-28 pb-10">
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href + link.label + i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-2xl font-bold text-foreground/80 hover:text-foreground border-b border-border/30 transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pr-4 mt-1 mb-2 flex flex-col gap-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full py-4 text-center font-semibold bg-gold text-background rounded-full text-lg mt-6"
              >
                ثبت درخواست
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
