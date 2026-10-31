// Article markup the design system expects from MDX:
//   - section headings (h2) get ids, for the contents list and links
//   - acronyms in running text are wrapped in <abbr>, which Literata sets in
//     small caps; code, headings, table headers and figures are left alone

const ACRONYM = /\b[A-Z][A-Z0-9]{1,}\b/g
const BLOCKS = new Set(['p', 'li', 'td'])
const SKIP = new Set(['code', 'pre', 'svg', 'figure', 'th', 'abbr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

function textOf(node) {
  if (node.type === 'text') return node.value
  return (node.children ?? []).map(textOf).join('')
}

function slug(text) {
  return text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function splitAcronyms(value) {
  let parts = []
  let last = 0
  for (let match of value.matchAll(ACRONYM)) {
    if (match.index > last) parts.push({ type: 'text', value: value.slice(last, match.index) })
    parts.push({ type: 'element', tagName: 'abbr', properties: {}, children: [{ type: 'text', value: match[0] }] })
    last = match.index + match[0].length
  }
  if (last < value.length) parts.push({ type: 'text', value: value.slice(last) })
  return parts
}

export default function rehypeKashlabs() {
  return (tree) => {
    let walk = (node, inBlock, skip) => {
      if (!node.children) return
      node.children = node.children.flatMap((child) => {
        if (child.type === 'element') {
          if (child.tagName === 'h2' && !child.properties?.id) {
            child.properties = { ...child.properties, id: slug(textOf(child)) }
          }
          walk(child, inBlock || BLOCKS.has(child.tagName), skip || SKIP.has(child.tagName))
          return [child]
        }
        if (child.type === 'text') {
          return inBlock && !skip ? splitAcronyms(child.value) : [child]
        }
        // MDX JSX elements, such as <Diagram>, render themselves.
        if (!child.type.startsWith('mdxJsx')) walk(child, inBlock, skip)
        return [child]
      })
    }
    walk(tree, false, false)
  }
}
