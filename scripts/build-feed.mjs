#!/usr/bin/env node
// Write out/feed.xml from the article pages in the static export.
//
// Runs after next build. A static export has no server to render the feed on
// request, so this reads each article's exported HTML instead: its title,
// first date and body, as the template's feed route did.

import { readdir, readFile, writeFile } from 'node:fs/promises'
import nextEnv from '@next/env'
import * as cheerio from 'cheerio'
import { Feed } from 'feed'

nextEnv.loadEnvConfig(process.cwd())
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
if (!siteUrl) {
  throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
}

const author = {
  name: 'Kashyap Kopparam',
  email: 'me@kkoppa.com',
}

const feed = new Feed({
  title: author.name,
  description: 'Your blog description',
  author,
  id: siteUrl,
  link: siteUrl,
  image: `${siteUrl}/favicon.ico`,
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}`,
  feedLinks: {
    rss2: `${siteUrl}/feed.xml`,
  },
})

const slugs = (await readdir('src/app/articles', { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const items = []
for (const slug of slugs) {
  const html = await readFile(`out/articles/${slug}/index.html`, 'utf8')
  const $ = cheerio.load(html)
  const article = $('article').first()
  const title = article.find('h1').first().text()
  const date = article.find('time').first().attr('datetime')
  const content = article.find('[data-mdx-content]').first().html()
  if (!title || !date || !content) {
    throw Error(`build-feed: out/articles/${slug}/index.html has no title, date or body`)
  }

  const url = `${siteUrl}/articles/${slug}/`
  items.push({
    title,
    id: url,
    link: url,
    content,
    author: [author],
    contributor: [author],
    date: new Date(date),
  })
}

items.sort((a, z) => z.date - a.date).forEach((item) => feed.addItem(item))
await writeFile('out/feed.xml', feed.rss2())
console.log(`build-feed: ${items.length} articles`)
