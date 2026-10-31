import { useId } from 'react'

export function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  let id = useId()

  return (
    <section className="kl-section" aria-labelledby={id}>
      <h2 className="kl-section__title" id={id}>
        {title}
      </h2>
      <div className="kl-section__body">{children}</div>
    </section>
  )
}
