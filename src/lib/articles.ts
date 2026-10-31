import { readFile } from 'node:fs/promises'
import glob from 'fast-glob'

export interface Revision {
  rev: string
  description: string
  date: string
}

export interface Article {
  title: string
  description: string
  author: string
  date: string
  // KL- and four digits, in publication order, never reused.
  docNo: string
  // Changes of substance after the first issue, oldest first. Revision
  // letters skip I, O, Q, S, X and Z.
  revisions?: Array<Revision>
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

const WORDS_PER_MINUTE = 230

// What the title block and revision table need beyond the article's own
// metadata: reading time from the source, and the revision history with the
// first issue in front.
export async function getArticleRecord(article: Article) {
  let found = (await getAllArticles()).find((a) => a.docNo === article.docNo)
  let minutes = 1
  if (found) {
    let source = await readFile(`./src/app/articles/${found.slug}/page.mdx`, 'utf8')
    let prose = source
      .replace(/```[\s\S]*?```/g, '')
      .replace(/^(import|export)[\s\S]*?^$/gm, '')
    let words = prose.match(/[\p{L}\p{N}’']+/gu)?.length ?? 0
    minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  }

  let revisions: Array<Revision> = [
    { rev: 'A', description: 'First issue', date: article.date },
    ...(article.revisions ?? []),
  ]

  return { minutes, revisions }
}
