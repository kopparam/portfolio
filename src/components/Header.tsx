'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeSwitch } from '@/components/ThemeSwitch'
import { navigation } from '@/components/navigation'

export function Header() {
  let pathname = usePathname()

  return (
    <header className="kl-header">
      <div className="kl-header__inner kl-gutter">
        <Link className="kl-wordmark" href="/">
          kashlabs
        </Link>
        <div className="kl-header__end">
          <nav className="kl-nav" aria-label="Site">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? 'page'
                    : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
