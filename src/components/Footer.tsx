import Link from 'next/link'

import { navigation } from '@/components/navigation'

export function Footer() {
  return (
    <footer className="kl-footer">
      <div className="kl-footer__inner kl-gutter">
        <nav aria-label="Footer">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href="/feed.xml">RSS</a>
        </nav>
        <span>&copy; {new Date().getFullYear()} Kashyap Kopparam</span>
      </div>
    </footer>
  )
}
