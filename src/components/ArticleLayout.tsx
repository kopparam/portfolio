import Link from 'next/link'

import { Contents } from '@/components/Contents'
import { Prose } from '@/components/Prose'
import { type Article, getArticleRecord } from '@/lib/articles'

export async function ArticleLayout({
  article,
  children,
}: {
  article: Article
  children: React.ReactNode
}) {
  let { minutes, revisions } = await getArticleRecord(article)
  let rev = revisions[revisions.length - 1].rev

  return (
    <div className="kl-layout kl-gutter">
      <Contents />
      <article className="kl-article">
        <header className="kl-article__head">
          <Link className="kl-label" href="/articles">
            ← Articles
          </Link>
          <h1 className="kl-article__title">{article.title}</h1>
          <p className="kl-article__lede">{article.description}</p>
          <dl className="kl-titleblock" aria-label="Document details">
            <div>
              <dt>Author</dt>
              <dd>{article.author}</dd>
            </div>
            <div>
              <dt>Doc no.</dt>
              <dd>{article.docNo}</dd>
            </div>
            <div>
              <dt>Issued</dt>
              <dd>
                <time dateTime={article.date}>{article.date}</time>
              </dd>
            </div>
            <div>
              <dt>Rev</dt>
              <dd>{rev}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Article</dd>
            </div>
            <div>
              <dt>Reading</dt>
              <dd>{minutes} min</dd>
            </div>
          </dl>
        </header>
        <Prose data-mdx-content>{children}</Prose>
        <section className="kl-revisions" aria-labelledby="revisions">
          <span className="kl-label" id="revisions">
            Revisions
          </span>
          <table>
            <thead>
              <tr>
                <th scope="col">Rev</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((r) => (
                <tr key={r.rev}>
                  <td>{r.rev}</td>
                  <td>{r.description}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  )
}
