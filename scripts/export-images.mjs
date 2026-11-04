#!/usr/bin/env node
// Write the resized images next/image asks for into the static export.
//
// Runs after next build. For every JPEG, PNG and WebP in out/_next/static/media
// it writes one copy per width in src/lib/image-sizes.mjs, named the way
// src/lib/image-loader.mjs expects. A width larger than the image keeps the
// original size.

import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

import { deviceSizes, imageSizes } from '../src/lib/image-sizes.mjs'

const media = 'out/_next/static/media'
const widths = [...new Set([...imageSizes, ...deviceSizes])]
const images = (await readdir(media)).filter(
  (name) => /\.(jpe?g|png|webp)$/i.test(name) && !/\.w\d+\.\w+$/.test(name),
)

for (const name of images) {
  await Promise.all(
    widths.map((width) =>
      sharp(join(media, name))
        // Apply the camera's orientation before the metadata is dropped.
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true, force: false })
        .toFile(join(media, name.replace(/\.(\w+)$/, `.w${width}.$1`))),
    ),
  )
}

console.log(`export-images: ${images.length} images at ${widths.length} widths`)
