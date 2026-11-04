#!/usr/bin/env node
// Copy the built Kashlabs design system into src/design-system.
//
//   node scripts/sync-design-system.mjs [path to kashlabs-design-system]
//
// The site carries a copy rather than a submodule so the Docker build never
// needs access to the design system's private repository. Run this after
// building the design system; it records which commit the copy came from.

import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(process.argv[2] || process.env.DESIGN_SYSTEM_DIR || join(site, '..', 'kashlabs-design-system'))
const target = join(site, 'src/design-system')

const FILES = [
  'dist/tokens.css',
  'dist/fonts.css',
  'dist/tailwind-preset.cjs',
  'project/components/bundle.css',
  'project/fonts',
  'd2/kl-d2.mjs',
  'd2/kashlabs.d2',
  'd2/token-map.json',
  'd2/fonts',
  'project/assets/Logo',
]

// Next.js serves these from src/app by their file names: the favicons, the
// Apple touch icon and the card shown when a page is shared.
const APP_FILES = {
  'project/assets/Logo/favicon.ico': 'favicon.ico',
  'project/assets/Logo/favicon.svg': 'icon.svg',
  'project/assets/Logo/apple-touch-icon.png': 'apple-icon.png',
  'project/assets/Logo/opengraph.png': 'opengraph-image.png',
}

if (!existsSync(join(source, 'tokens'))) {
  console.error(`sync-design-system: no design system at ${source}; pass its path as the first argument`)
  process.exit(1)
}

rmSync(target, { recursive: true, force: true })
for (const path of FILES) {
  mkdirSync(dirname(join(target, path)), { recursive: true })
  cpSync(join(source, path), join(target, path), { recursive: true })
}
for (const [path, name] of Object.entries(APP_FILES)) {
  cpSync(join(source, path), join(site, 'src/app', name))
}

const git = (...args) => execFileSync('git', ['-C', source, ...args], { encoding: 'utf8' }).trim()
const commit = git('rev-parse', '--short', 'HEAD')
const dirty = git('status', '--porcelain') !== ''
writeFileSync(join(target, 'SOURCE'), `kashlabs-design-system ${commit}${dirty ? ' with uncommitted changes' : ''}\n`)
console.log(`sync-design-system: copied ${FILES.length} paths from ${commit}${dirty ? ' (uncommitted changes included)' : ''}`)
