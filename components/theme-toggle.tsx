"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === "light"

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label={isLight ? "تغییر به تم تاریک" : "تغییر به تم روشن"}
      className="fixed bottom-32 left-5 z-50 lg:bottom-8 lg:left-8 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300"
      style={{
        background: isLight
          ? "oklch(0.12 0 0)"
          : "oklch(0.98 0 0)",
        color: isLight ? "oklch(0.98 0 0)" : "oklch(0.12 0 0)",
        boxShadow: isLight
          ? "0 4px 24px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)"
          : "0 4px 24px rgba(86,181,190,0.25), 0 0 0 1px rgba(86,181,190,0.15)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Moon size={20} strokeWidth={1.8} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Sun size={20} strokeWidth={1.8} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
