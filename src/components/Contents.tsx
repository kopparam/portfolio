'use client'

import { useEffect, useState } from 'react'

type Heading = { id: string; text: string }

// Lists the article's sections and marks the one at the top of the screen.
// The layout shows it beside the article from 1200px wide.
export function Contents() {
  let [headings, setHeadings] = useState<Array<Heading>>([])
  let [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    let elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('[data-mdx-content] h2[id]'),
    )
    setHeadings(elements.map((h) => ({ id: h.id, text: h.textContent ?? '' })))

    let queued = false
    function mark() {
      queued = false
      let top: HTMLHeadingElement | null = null
      for (let h of elements) {
        if (h.getBoundingClientRect().top < window.innerHeight * 0.35) top = h
      }
      setCurrent(top?.id ?? null)
    }
    function onScroll() {
      if (!queued) {
        queued = true
        requestAnimationFrame(mark)
      }
    }
    mark()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="kl-contents" aria-label="Contents">
      {headings.length >= 2 && (
        <>
          <span className="kl-label">Contents</span>
          <ol>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} aria-current={current === h.id}>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
    </nav>
  )
}
