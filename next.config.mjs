import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeKashlabs from './src/lib/rehype-kashlabs.mjs'
import remarkD2 from './src/lib/remark-d2.mjs'
import { deviceSizes, imageSizes } from './src/lib/image-sizes.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  // A static site in out/, published to GitHub Pages. Pages serves a
  // directory's index.html, so /articles/ and /articles/homeprod/ are
  // folders rather than articles.html next to an articles/ folder.
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.mjs',
    deviceSizes,
    imageSizes,
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkD2],
    rehypePlugins: [rehypePrism, rehypeKashlabs],
  },
})

export default withMDX(nextConfig)
