import clsx from 'clsx'

// The Kashlabs mark on the design system's 48-unit grid (construction sheet
// KL-0000): three rack units linked to two machines. The kl-mark classes give
// its parts the theme's colours, and its openings are cut out, so it sits on
// any ground. Draw the status light (`lit`) from 32 px up.
const RACK = 'M3 3 L18 3 L18 15 L3 15 Z M3 18 L18 18 L18 30 L3 30 Z M3 33 L18 33 L18 45 L3 45 Z'
const RING = 'M5.25 21.75 L5.25 26.25 L9.75 26.25 L9.75 21.75 Z'
const MACHINES =
  'M33 3 L45 3 L45 15 L33 15 Z M36 6 L36 12 L42 12 L42 6 Z M33 33 L45 33 L45 45 L33 45 Z M36 36 L36 42 L42 42 L42 36 Z'
const LINKS = 'M18 21 L33 6 L33 12 L18 27 Z M18 21 L33 36 L33 42 L18 27 Z'

export function Mark({
  lit = false,
  className,
  ...props
}: { lit?: boolean } & React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={clsx('kl-mark', className)}
      {...props}
    >
      <path
        className="kl-mark__ink"
        fillRule="evenodd"
        d={lit ? `${RACK} ${RING} ${MACHINES}` : `${RACK} ${MACHINES}`}
      />
      <path className="kl-mark__link" d={LINKS} />
      {lit && (
        <rect className="kl-mark__light" x="6" y="22.5" width="3" height="3" />
      )}
    </svg>
  )
}
