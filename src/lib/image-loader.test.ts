import { describe, expect, test } from 'bun:test'

import imageLoader from './image-loader.mjs'
import { deviceSizes, imageSizes } from './image-sizes.mjs'

// scripts/export-images.mjs writes these names, so the two must agree.
describe('imageLoader', () => {
  test('points a bundled photo at its copy for that width', () => {
    expect(
      imageLoader({ src: '/_next/static/media/image-1.b5025775.jpg', width: 640 }),
    ).toBe('/_next/static/media/image-1.b5025775.w640.jpg')
  })

  test('handles PNG and WebP the same way', () => {
    expect(imageLoader({ src: '/_next/static/media/logo.1a2b.png', width: 128 })).toBe(
      '/_next/static/media/logo.1a2b.w128.png',
    )
    expect(imageLoader({ src: '/_next/static/media/a.1a2b.webp', width: 64 })).toBe(
      '/_next/static/media/a.1a2b.w64.webp',
    )
  })

  // There are no resized copies of these, so they are served as they are.
  test('leaves SVGs, other paths and other sites alone', () => {
    for (let src of [
      '/_next/static/media/audax.3c4d.svg',
      '/icon.svg',
      '/images/photo.jpg',
      'https://example.com/_next/static/media/photo.jpg',
    ]) {
      expect(imageLoader({ src, width: 640 })).toBe(src)
    }
  })

  test('the widths are distinct and in order', () => {
    let widths = [...imageSizes, ...deviceSizes]
    expect(widths).toEqual([...new Set(widths)].sort((a, b) => a - b))
  })
})
