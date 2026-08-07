"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "dark" | "light" | "luxury"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

const ALL_THEMES: Theme[] = ["dark", "light", "luxury"]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    const stored = localStorage.getItem("clayberg-theme") as Theme | null
    if (stored && ALL_THEMES.includes(stored)) {
      setThemeState(stored)
    }
  }, [])

  useEffect(() => {
    const html = document.documentElement
    // Remove all theme classes first
    ALL_THEMES.forEach((t) => html.classList.remove(t))
    // Apply current theme class (dark is the default :root, still add class for consistency)
    html.classList.add(theme)
    localStorage.setItem("clayberg-theme", theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
