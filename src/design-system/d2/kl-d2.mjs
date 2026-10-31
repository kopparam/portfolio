#!/usr/bin/env node
// kl-d2: render a D2 diagram in the Kashlabs style.
//
//   node d2/kl-d2.mjs <diagram.d2> <diagram.svg>
//
// Puts kashlabs.d2 (built from the tokens by scripts/build.mjs) in front of
// the diagram, runs D2 with Monaspace Krypton, then rewrites the SVG so it
// follows the design system:
//   - every theme colour becomes its token, var(--ink, #0c2350) and so on,
//     so the diagram follows the page's light and dark mode
//   - host, machine and group names sit in the top border, hosts on tape
//   - line weights come from the stroke tokens
//   - "# title:" and "# description:" comments become <title> and <desc>
//
// D2_BIN overrides the d2 binary (default: d2 on the PATH).

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const D2 = process.env.D2_BIN || 'd2'
const FONTS = join(here, 'fonts')
const { tokens: TOKENS, light: LIGHT, strokes: STROKES } = JSON.parse(readFileSync(join(here, 'token-map.json'), 'utf8'))

// D2 sets container names in its bold face, which is Monaspace Krypton
// SemiWide SemiBold: 1398 of 2000 units per glyph, the same width as the
// tape labels on the page. A mono's advance is the same for every glyph, so
// label widths are exact.
const LABEL_ADVANCE = 1398 / 2000
const TAPE_PAD_X = 6
const LEGEND_INSET = 12

const v = (name) => `var(--${name}, ${LIGHT[name]})`

function token(hex) {
  const name = TOKENS[hex.toLowerCase()]
  return name ? v(name) : null
}

function unescape(text) {
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function render(input) {
  const source = readFileSync(input, 'utf8')
  const theme = readFileSync(join(here, 'kashlabs.d2'), 'utf8')
  const dir = mkdtempSync(join(tmpdir(), 'kl-d2-'))
  try {
    const d2File = join(dir, 'diagram.d2')
    const svgFile = join(dir, 'diagram.svg')
    writeFileSync(d2File, `${theme}\n${source}`)
    execFileSync(D2, [
      '--font-regular', join(FONTS, 'MonaspaceKryptonFrozen-Regular.ttf'),
      '--font-semibold', join(FONTS, 'MonaspaceKryptonFrozen-SemiBold.ttf'),
      '--font-bold', join(FONTS, 'MonaspaceKryptonFrozen-SemiWideSemiBold.ttf'),
      '--font-italic', join(FONTS, 'MonaspaceKryptonFrozen-Italic.ttf'),
      d2File, svgFile,
    ], { stdio: ['ignore', 'ignore', 'inherit'] })
    return { source, svg: readFileSync(svgFile, 'utf8') }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

// Container names sit in the top border, inset like a legend: hosts on tape,
// machines and groups in a gap in the line. D2 cuts the border under its own
// label with a mask; the legend replaces that, so the mask goes.
const LEGENDS = {
  host: { fill: v('tape'), text: v('on-tape') },
  node: { fill: v('ground'), text: v('ink') },
  group: { fill: v('ground'), text: v('ink-muted') },
}

function addLegends(svg) {
  return svg.replace(
    /<g class="([^"]*)"><g class="shape" >(<rect [^>]*\/>)<\/g><text x="[\d.]+" y="[\d.]+" fill="#[0-9a-fA-F]{6}" class="([^"]*)" style="[^"]*?font-size:([\d.]+)px[^"]*">([^<]*)<\/text>/g,
    (match, groupClass, rect, textClass, size, label) => {
      const kind = Object.keys(LEGENDS).find((k) => groupClass.split(' ').includes(k))
      if (!kind) return match
      const { fill, text } = LEGENDS[kind]
      const left = Number(rect.match(/ x="([\d.-]+)"/)[1])
      const border = Number(rect.match(/ y="([\d.-]+)"/)[1])
      const fs = Number(size)
      const width = unescape(label).length * LABEL_ADVANCE * fs + TAPE_PAD_X * 2
      const height = Math.round(fs * 1.5)
      const x = left + LEGEND_INSET
      return `<g class="${groupClass}"><g class="shape" >${rect.replace(/ mask="[^"]*"/, '')}</g>`
        + `<rect class="kl-legend kl-legend-${kind}" x="${x}" y="${(border - height / 2).toFixed(1)}" width="${width.toFixed(1)}" height="${height}" style="fill:${fill}" />`
        + `<text x="${(x + width / 2).toFixed(1)}" y="${(border + fs * 0.36).toFixed(1)}" class="${textClass}" style="fill:${text};text-anchor:middle;font-size:${fs}px">${label}</text>`
    },
  )
}

function tokeniseAttributes(svg) {
  return svg.replace(/<(rect|path|text|polygon|circle|ellipse|line|polyline)\b([^>]*?)(\s*\/?)>/g, (match, tag, attrs, end) => {
    let props = ''
    const rest = attrs.replace(/\s(fill|stroke)="(#[0-9a-fA-F]{6})"/g, (a, prop, hex) => {
      const value = token(hex)
      if (!value) return a
      props += `${prop}:${value};`
      return ''
    })
    if (!props) return match
    const withStyle = /\sstyle="/.test(rest) ? rest.replace(/\sstyle="/, ` style="${props}`) : `${rest} style="${props}"`
    return `<${tag}${withStyle}${end}>`
  })
}

function tokeniseStylesheets(svg) {
  return svg.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (m, open, css, close) =>
    open + css.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => token(hex) || hex) + close)
}

function finish(svg, meta) {
  // The canvas is transparent so the diagram sits on whatever is behind it.
  svg = svg.replace(/(<rect [^>]*?)fill="#[0-9a-fA-F]{6}"( class=" fill-N7" stroke-width="0")/, '$1fill="none"$2')
  svg = addLegends(svg)
  svg = tokeniseAttributes(svg)
  svg = tokeniseStylesheets(svg)

  const id = (svg.match(/class="(d2-\d+) d2-svg"/) || [, 'kl-d2'])[1]
  const s = (name) => `var(--${name}, ${STROKES[name]})`
  const lines = `<style>
.kl-diagram .host > .shape > rect { stroke-width: ${s('stroke-line')} !important }
.kl-diagram .node > .shape > rect, .kl-diagram .group > .shape > rect, .kl-diagram .zone > .shape > rect { stroke-width: ${s('stroke-hair')} !important }
.kl-diagram path.connection { stroke-width: ${s('stroke-symbol')} !important }
</style>`
  const a11y = (meta.title ? `<title id="${id}-title">${escape(meta.title)}</title>` : '')
    + (meta.description ? `<desc id="${id}-desc">${escape(meta.description)}</desc>` : '')
  const labelled = [meta.title && `${id}-title`, meta.description && `${id}-desc`].filter(Boolean).join(' ')
  svg = svg.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"([^>]*)>/, (m, attrs) =>
    `<svg xmlns="http://www.w3.org/2000/svg"${attrs} class="kl-diagram" role="img"${labelled ? ` aria-labelledby="${labelled}"` : ''}>${a11y}${lines}`)
  return svg.replace(/^<\?xml[^>]*>\s*/, '')
}

const [input, output] = process.argv.slice(2)
if (!input || !output) {
  console.error('Usage: node d2/kl-d2.mjs <diagram.d2> <diagram.svg>')
  process.exit(2)
}
const { source, svg } = render(input)
const meta = Object.fromEntries([...source.matchAll(/^#\s*(title|description):\s*(.+)$/gm)].map((m) => [m[1], m[2].trim()]))
writeFileSync(output, finish(svg, meta))
console.log(`kl-d2: wrote ${output}`)
