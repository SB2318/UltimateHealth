// src/components/ModeToggle.tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <i className="fas fa-sun text-yellow-500 text-sm" aria-hidden="true"></i>
      ) : (
        <i className="fas fa-moon text-slate-600 dark:text-slate-400 text-sm" aria-hidden="true"></i>
      )}
    </button>
  )
}