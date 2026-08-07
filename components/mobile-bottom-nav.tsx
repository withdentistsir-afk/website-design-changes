"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Search, ArrowLeftRight, Phone, Info } from "lucide-react"

const mobileNavItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/products", label: "جستجو", icon: Search },
  { href: "/compare", label: "مقایسه", icon: ArrowLeftRight },
  { href: "/about", label: "درباره ما", icon: Info },
  { href: "/contact", label: "تماس", icon: Phone },
]

export function MobileBottomNav() {
  const pathname = usePathname()

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
