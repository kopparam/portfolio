import Link from 'next/link'
import clsx from 'clsx'

export function Card<T extends React.ElementType = 'article'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  let Component = as ?? 'article'

  return <Component className={clsx('kl-card', className)}>{children}</Component>
}

// The date, set into the card's top border like a legend.
Card.Legend = function CardLegend({ date }: { date: string }) {
  return (
    <time className="kl-card__legend" dateTime={date}>
      {date}
    </time>
  )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
  as?: T
  href?: string
}) {
  let Component = as ?? 'h2'

  return (
    <Component className="kl-card__title">
      {href ? <Link href={href}>{children}</Link> : children}
    </Component>
  )
}

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return <p className="kl-card__text">{children}</p>
}

Card.Cta = function CardCta({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link className="kl-card__more" href={href}>
      {children} →
    </Link>
  )
}
