// Point next/image at the copies scripts/export-images.mjs writes beside each
// image at build time: image-1.abc123.jpg at 640px is image-1.abc123.w640.jpg.
// next dev has no copies, and anything else, such as an SVG, is served as it is.
export default function imageLoader({ src, width }) {
  if (
    process.env.NODE_ENV === 'development' ||
    !/^\/_next\/static\/media\/[^/]+\.(jpe?g|png|webp)$/i.test(src)
  ) {
    return src
  }
  return src.replace(/\.(\w+)$/, `.w${width}.$1`)
}
