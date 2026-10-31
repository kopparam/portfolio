import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="pb-24 pt-16 sm:pt-24">
      <div className="kl-article__head">
        <span className="kl-label">404</span>
        <h1 className="kl-article__title">Page not found</h1>
        <p className="kl-article__lede">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button href="/" variant="secondary" className="self-start">
          Go back home
        </Button>
      </div>
    </Container>
  )
}
