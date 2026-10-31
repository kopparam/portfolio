import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

import rehypeKashlabs from './src/lib/rehype-kashlabs.mjs'
import remarkD2 from './src/lib/remark-d2.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: "standalone",
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkD2],
    rehypePlugins: [rehypePrism, rehypeKashlabs],
  },
})

export default withMDX(nextConfig)
