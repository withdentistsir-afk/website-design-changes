"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Grid2X2, ArrowLeftRight, Phone, Info } from "lucide-react"

const mobileNavItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/products", label: "محصولات", icon: Grid2X2 },
  { href: "/compare", label: "مقایسه", icon: ArrowLeftRight },
  { href: "/about", label: "درباره ما", icon: Info },
  { href: "/contact", label: "تماس", icon: Phone },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden"
      aria-label="منوی پایین موبایل"
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl border-t border-border" />

      <ul className="relative flex items-center justify-around px-2 py-2 pb-[env(safe-area-inset-bottom)]">
        {mobileNavItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1 py-1 relative group"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-2 inset-x-3 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
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
