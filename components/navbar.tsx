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
    groups: [
      {
        label: "اجاق گاز",
        href: "/products?cat=hob",
        children: [
          { href: "/products?cat=hob&sub=glass", label: "اجاق گاز صفحه شیشه‌ای" },
          { href: "/products?cat=hob&sub=steel", label: "اجاق گاز صفحه استیل" },
          { href: "/products?cat=hob&sub=electric", label: "اجاق گاز برقی" },
        ],
      },
      {
        label: "هود آشپزخانه",
        href: "/products?cat=hood",
        children: [
          { href: "/products?cat=hood&sub=chimney", label: "هود شومینه‌ای" },
          { href: "/products?cat=hood&sub=hidden", label: "هود مخفی" },
        ],
      },
      {
        label: "سینک آشپزخانه",
        href: "/products?cat=sink",
        children: [
          { href: "/products?cat=sink&sub=handmade", label: "سینک دست ساز" },
          { href: "/products?cat=sink&sub=fancy", label: "سینک فانتزی" },
          { href: "/products?cat=sink&sub=granite", label: "سینک گرانیتی" },
        ],
      },
      {
        label: "فر توکار",
        href: "/products?cat=oven",
        children: [],
      },
      {
        label: "ماکروویو + فر",
        href: "/products?cat=microwave",
        children: [],
      },
    ],
  },
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
                link.groups ? (
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
                          className="absolute top-full right-0 mt-3 bg-card border border-border rounded-2xl shadow-2xl py-5 px-5 z-50 flex gap-6"
                          onMouseEnter={() => setMegaOpen(true)}
                          onMouseLeave={() => setMegaOpen(false)}
                        >
                          {link.groups.map((group) => (
                            <div key={group.href} className="min-w-[140px]">
                              <Link
                                href={group.href}
                                className="block text-xs font-bold text-gold tracking-widest uppercase mb-2 hover:text-gold/80 transition-colors"
                              >
                                {group.label}
                              </Link>
                              {group.children.length > 0 && (
                                <div className="flex flex-col gap-0.5 border-t border-border/40 pt-2">
                                  {group.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="block py-1.5 text-sm text-foreground/65 hover:text-foreground hover:pr-1 transition-all duration-200"
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
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
                    {link.groups && (
                      <div className="pr-4 mt-1 mb-2 flex flex-col gap-0">
                        {link.groups.map((group) => (
                          <div key={group.href}>
                            <Link
                              href={group.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm font-semibold text-gold/80"
                            >
                              {group.label}
                            </Link>
                            {group.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-1.5 pr-4 text-sm text-foreground/50 hover:text-foreground transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
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
