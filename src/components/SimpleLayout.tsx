import { Container } from '@/components/Container'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container className="flex flex-col gap-12 pb-24 pt-12 sm:gap-16">
      <header className="kl-article__head">
        <h1 className="kl-article__title">{title}</h1>
        <p className="kl-article__lede">{intro}</p>
      </header>
      {children}
    </Container>
  )
}
