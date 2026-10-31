import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card>
      <Card.Legend date={article.date} />
      <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta href={`/articles/${article.slug}`}>Read article</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing on software engineering."
      intro="All of thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="flex max-w-measure flex-col gap-8">
        {articles.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </div>
    </SimpleLayout>
  )
}
