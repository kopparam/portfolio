import Image from 'next/image'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { SocialLinks } from '@/components/SocialLinks'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card>
      <Card.Legend date={article.date} />
      <Card.Title as="h3" href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta href={`/articles/${article.slug}`}>Read article</Card.Cta>
    </Card>
  )
}

interface Role {
  company: string
  title: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime
  let endLabel = typeof role.end === 'string' ? role.end : role.end.label

  return (
    <li>
      <span className="kl-work__org">{role.company}</span>
      <span className="kl-work__role">{role.title}</span>
      <time dateTime={startDate} aria-label={`${startLabel} until ${endLabel}`}>
        {startLabel}–{endLabel}
      </time>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Audax Financial Techology',
      title: 'Staff Solution Architect',
      start: '2023',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'GoTo Financial',
      title: 'Engineering Manager, Software Architect and Senior Engineer',
      start: '2018',
      end: '2023',
    },
    {
      company: 'Agoda',
      title: 'Software Engineer',
      start: '2017',
      end: '2018',
    },
    {
      company: 'ThoughtWorks',
      title: 'Developer',
      start: '2014',
      end: '2017',
    },
  ]

  return (
    <section className="kl-work" aria-label="Work">
      <span className="kl-tape">Work</span>
      <ol>
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href="https://paperless.kopparam.com/share/g2waQOAatG2gK7i2SjYhB9SA2Iy2WAO8tz5ARg8vxYBI8a8hmC"
        variant="secondary"
      >
        Download CV
      </Button>
    </section>
  )
}

function Photos() {
  return (
    <Container>
      <div className="flex gap-6 overflow-x-auto pb-2 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image) => (
          <div
            key={image.src}
            className="relative aspect-[9/10] w-44 flex-none overflow-hidden border-stroke-line border-ink bg-surface-sunken sm:w-72"
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="pb-12 pt-12 sm:pt-16">
        <div className="kl-article__head">
          <h1 className="kl-article__title">Solution Architect</h1>
          <p className="kl-article__lede">
            I’m Kashyap, a Solution Architect, with Product Owner, Engineering Manager and Software Engineering background, based in Singapore. I’m working with Audax to supercharge banks’ growth with plug-and-play digital solutions, fueling digital banking and embedded finance solutions.
          </p>
          <p className="kl-article__lede">
            I occasionally write about some of the exploration I undertake. You can find my CV below.
          </p>
          <SocialLinks />
        </div>
      </Container>
      <Photos />
      <Container className="pb-24 pt-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <section className="flex flex-col gap-8" aria-labelledby="writing">
            <h2 className="kl-label" id="writing">
              Writing
            </h2>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </section>
          <div className="lg:pt-10">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
