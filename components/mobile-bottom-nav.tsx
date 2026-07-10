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
      className="fixed bottom-4 inset-x-0 z-50 lg:hidden flex justify-center px-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="منوی پایین موبایل"
    >
      <ul
        className="flex items-center justify-around w-full max-w-sm bg-card/95 backdrop-blur-xl border border-border rounded-2xl px-2 py-2"
        style={{ boxShadow: "0 4px 32px 0 rgba(86, 181, 190, 0.18), 0 1px 8px 0 rgba(86, 181, 190, 0.08)" }}
      >
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
                    className="absolute -top-2 inset-x-2 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon
                  size={19}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span
                  className={`text-[9px] font-medium transition-colors duration-200 ${
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
