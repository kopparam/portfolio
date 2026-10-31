// A kl-d2 diagram framed like a drawing sheet, with a numbered caption and a
// key. remark-d2 renders the SVG and works out which shapes the key needs.

const KEY: Record<string, { label: string; swatch: React.ReactNode }> = {
  host: {
    label: 'Host: a machine or cluster',
    swatch: (
      <>
        <rect x="1" y="4" width="32" height="13" style={{ fill: 'var(--ground)', stroke: 'var(--ink)', strokeWidth: 'var(--stroke-line)' }} />
        <rect x="5" y="1" width="14" height="6" style={{ fill: 'var(--tape)' }} />
      </>
    ),
  },
  node: {
    label: 'Machine inside a host',
    swatch: (
      <>
        <rect x="1" y="4" width="32" height="13" style={{ fill: 'var(--surface)', stroke: 'var(--ink)', strokeWidth: 'var(--stroke-hair)' }} />
        <rect x="5" y="2" width="12" height="4" style={{ fill: 'var(--ground)' }} />
      </>
    ),
  },
  zone: {
    label: 'Zone or loose group',
    swatch: (
      <rect x="1" y="3" width="32" height="13" style={{ fill: 'none', stroke: 'var(--ink-muted)', strokeWidth: 'var(--stroke-hair)', strokeDasharray: '3 3' }} />
    ),
  },
  connection: {
    label: 'Connection',
    swatch: (
      <>
        <path d="M1 9 H27" style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 'var(--stroke-symbol)' }} />
        <path d="M26 5 L33 9 L26 13 Z" style={{ fill: 'var(--accent)' }} />
      </>
    ),
  },
  private: {
    label: 'Private-network connection',
    swatch: (
      <>
        <path d="M1 9 H27" style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 'var(--stroke-symbol)', strokeDasharray: '4 3' }} />
        <path d="M26 5 L33 9 L26 13 Z" style={{ fill: 'var(--accent)' }} />
      </>
    ),
  },
}

export function Diagram({
  number,
  title,
  kinds,
  svg,
}: {
  number: string
  title: string
  kinds: string
  svg: string
}) {
  let id = `fig-${number.padStart(2, '0')}`
  // Groups and zones are both dashed boxes, so they share one entry.
  let keys = [...new Set(kinds.split(' ').filter(Boolean).map((k) => (k === 'group' ? 'zone' : k)))]

  return (
    <figure className="kl-figure kl-wide" id={id} aria-labelledby={`${id}-caption`}>
      <div className="kl-figure__frame" dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption>
        <p className="kl-figure__caption" id={`${id}-caption`}>
          <span className="kl-figure__number">Fig {number.padStart(2, '0')}</span>
          {title}
        </p>
        {keys.length > 0 && (
          <div className="kl-key">
            <span className="kl-label">Key</span>
            {keys.map((k) => (
              <span className="kl-key__item" key={k}>
                <svg viewBox="0 0 34 18" aria-hidden="true">
                  {KEY[k].swatch}
                </svg>
                {KEY[k].label}
              </span>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  )
}
