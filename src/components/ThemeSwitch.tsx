'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const options = [
  { theme: 'system', label: 'Auto' },
  { theme: 'light', label: 'Light' },
  { theme: 'dark', label: 'Dark' },
]

export function ThemeSwitch() {
  let { theme, setTheme } = useTheme()
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // The stored choice is only known in the browser, so nothing is marked
  // until then.
  let current = mounted ? (theme ?? 'system') : null

  return (
    <div className="kl-theme" role="group" aria-label="Theme">
      {options.map((option) => (
        <button
          key={option.theme}
          type="button"
          aria-pressed={current === option.theme}
          onClick={() => setTheme(option.theme)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
