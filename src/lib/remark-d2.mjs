// Turns ```d2 code blocks into <Diagram> elements.
//
// Each diagram is rendered once by the design system's kl-d2 and cached in
// src/diagrams under a hash of its source and the design system's D2 files.
// Builds, including the deploy build, only need D2 when a diagram or the D2
// theme changes: render locally (brew install d2, or set D2_BIN) and commit
// the new SVG.

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const D2_DIR = join(process.cwd(), 'src/design-system/d2')
const CACHE = join(process.cwd(), 'src/diagrams')
const ENGINE = ['kl-d2.mjs', 'kashlabs.d2', 'token-map.json']
  .map((file) => readFileSync(join(D2_DIR, file), 'utf8'))
  .join('\0')

function render(source) {
  let key = createHash('sha256').update(ENGINE).update('\0').update(source).digest('hex').slice(0, 16)
  let cached = join(CACHE, `${key}.svg`)
  if (existsSync(cached)) return readFileSync(cached, 'utf8')

  let dir = mkdtempSync(join(tmpdir(), 'remark-d2-'))
  try {
    writeFileSync(join(dir, 'diagram.d2'), source)
    try {
      execFileSync(process.execPath, [join(D2_DIR, 'kl-d2.mjs'), join(dir, 'diagram.d2'), join(dir, 'diagram.svg')], {
        stdio: ['ignore', 'ignore', 'pipe'],
      })
    } catch (error) {
      throw new Error(
        `remark-d2: diagram ${key} is not in src/diagrams and could not be rendered. ` +
          `Install D2 0.9.0 (brew install d2) or set D2_BIN, build once, then commit src/diagrams/${key}.svg.\n` +
          `${error.stderr ?? error.message}`,
      )
    }
    let svg = readFileSync(join(dir, 'diagram.svg'), 'utf8')
    mkdirSync(CACHE, { recursive: true })
    writeFileSync(cached, svg)
    return svg
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

// What the figure's key needs to explain, from the classes the source uses.
function kinds(source) {
  let found = ['host', 'node', 'group', 'zone'].filter((kind) => new RegExp(`class:\\s*${kind}\\b`).test(source))
  if (/->|<-/.test(source)) found.push('connection')
  if (/class:\s*private\b/.test(source)) found.push('private')
  return found
}

const attribute = (name, value) => ({ type: 'mdxJsxAttribute', name, value })

export default function remarkD2() {
  return (tree) => {
    let number = 0
    let walk = (node) => {
      if (!node.children) return
      node.children = node.children.map((child) => {
        if (child.type !== 'code' || child.lang !== 'd2') {
          walk(child)
          return child
        }
        number += 1
        let title = child.value.match(/^#\s*title:\s*(.+)$/m)?.[1].trim() ?? ''
        return {
          type: 'mdxJsxFlowElement',
          name: 'Diagram',
          attributes: [
            attribute('number', String(number)),
            attribute('title', title),
            attribute('kinds', kinds(child.value).join(' ')),
            attribute('svg', render(child.value)),
          ],
          children: [],
        }
      })
    }
    walk(tree)
  }
}
