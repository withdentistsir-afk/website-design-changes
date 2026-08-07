"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Sparkles } from "lucide-react"
import { useTheme, type Theme } from "@/components/theme-provider"

const themes: { id: Theme; label: string; icon: React.ReactNode; bg: string; fg: string; ring: string }[] = [
  {
    id: "dark",
    label: "تم تاریک",
    icon: <Moon size={16} strokeWidth={1.8} />,
    bg: "oklch(0.14 0 0)",
    fg: "oklch(0.96 0 0)",
    ring: "rgba(86,181,190,0.4)",
  },
  {
    id: "light",
    label: "تم روشن",
    icon: <Sun size={16} strokeWidth={1.8} />,
    bg: "oklch(0.98 0 0)",
    fg: "oklch(0.12 0 0)",
    ring: "rgba(58,154,163,0.4)",
  },
  {
    id: "luxury",
    label: "تم لوکس",
    icon: <Sparkles size={16} strokeWidth={1.8} />,
    bg: "linear-gradient(135deg, oklch(0.17 0.012 60) 0%, oklch(0.13 0.008 60) 100%)",
    fg: "#c9a84c",
    ring: "rgba(201,168,76,0.5)",
  },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const active = themes.find((t) => t.id === theme) ?? themes[0]

  return (
    <div className="fixed bottom-32 left-5 z-50 lg:bottom-8 lg:left-8 flex flex-col-reverse items-center gap-2">
      {/* Theme options panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 items-center"
          >
            {themes.map((t) => {
              const isActive = t.id === theme
              return (
                <motion.button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id)
                    setOpen(false)
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={t.label}
                  title={t.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 relative"
                  style={{
                    background: t.bg,
                    color: t.fg,
                    boxShadow: isActive
                      ? `0 0 0 2px ${t.ring}, 0 4px 16px ${t.ring}`
                      : `0 2px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
                  }}
                >
                  {t.icon}
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background"
                      style={{ background: t.fg }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="تغییر تم"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 relative"
        style={{
          background: active.bg,
          color: active.fg,
          boxShadow: `0 4px 24px ${active.ring}, 0 0 0 1px rgba(255,255,255,0.07)`,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active.id}
            initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {active.icon}
          </motion.span>
        </AnimatePresence>

        {/* Open indicator ring */}
        {open && (
          <motion.span
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ boxShadow: `0 0 0 2px ${active.ring}` }}
          />
        )}
      </motion.button>
    </div>
  )
}
