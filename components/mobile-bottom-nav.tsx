"use client"

import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Grid2X2, ArrowLeftRight, Phone, Info } from "lucide-react"
import { Suspense } from "react"

const mobileNavItems = [
  { href: "/products?home=1", label: "خانه",     icon: Home },
  { href: "/products",        label: "محصولات",  icon: Grid2X2 },
  { href: "/compare",         label: "مقایسه",   icon: ArrowLeftRight },
  { href: "/about",           label: "درباره ما", icon: Info },
  { href: "/contact",         label: "تماس",     icon: Phone },
]

function MobileBottomNavInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isHome = pathname === "/products" && searchParams.get("home") === "1"

  const isActive = (href: string) => {
    if (href === "/products?home=1") return isHome
    if (href === "/products") return pathname === "/products" && !isHome
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed inset-x-5 z-50 lg:hidden"
      style={{ bottom: "20px" }}
      aria-label="منوی پایین موبایل"
    >
      <ul
        className="flex items-center justify-around w-full bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl px-1 py-1.5"
        style={{ boxShadow: "0 0 0 1px rgba(86,181,190,0.2), 0 0 30px 0 rgba(86,181,190,0.35), 0 8px 24px 0 rgba(0,0,0,0.5)" }}
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1 py-1 relative group"
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-2 inset-x-2 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon
                  size={19}
                  className={`transition-colors duration-200 ${active ? "text-gold" : "text-muted-foreground group-hover:text-foreground"}`}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <span className={`text-[9px] font-medium transition-colors duration-200 ${active ? "text-gold" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function MobileBottomNav() {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavInner />
    </Suspense>
  )
}
