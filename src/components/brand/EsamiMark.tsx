import { motion, useReducedMotion } from 'motion/react'
import { useId } from 'react'

type MarkTone = 'brand' | 'onDark'

interface EsamiMarkProps {
  tone?: MarkTone
  /** Plays the one-time "bars rise, tick lands" sequence on mount. */
  animated?: boolean
  className?: string
  /** Accessible name. Pass "" when the mark is decorative. */
  title?: string
}

// Traced from the supplied logo artwork on a 1254 × 1254 grid.
const E_UPPER =
  'M29 6 L1051 4 L1130 309 L1107 309 C1040 150 900 58 700 58 L418 58 L418 464 L146 669 L146 150 C146 62 96 30 29 28 Z'
const E_LOWER =
  'M349 1236 L422 1150 L880 1154 C1000 1154 1070 1060 1118 915 L1139 915 L1039 1236 Z'
const BARS = [
  'M159 721 L376 558 L376 934 L272 1039 L159 951 Z',
  'M437 508 L621 368 L621 729 L437 882 Z',
  'M679 309 L859 159 L859 568 L679 683 Z',
]
const TICK =
  'M2 918 L276 1252 C520 960 850 640 1252 455 C900 560 560 800 272 1097 C200 1020 110 950 2 918 Z'

const springRise = { type: 'spring', stiffness: 140, damping: 18 } as const

export function EsamiMark({ tone = 'brand', animated = false, className, title = 'ESAMI' }: EsamiMarkProps) {
  const uid = useId().replace(/:/g, '')
  // The starting pose must be identical in prerendered HTML and in the browser, so it
  // depends only on `animated`. Reduced motion just makes the move instant.
  const reduceMotion = useReducedMotion()
  const instant = { duration: 0 } as const

  const eFill = tone === 'onDark' ? `url(#${uid}-e-light)` : `url(#${uid}-e-navy)`

  return (
    <svg
      viewBox="0 0 1254 1254"
      className={className}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <defs>
        <linearGradient id={`${uid}-e-navy`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4562" />
          <stop offset="0.45" stopColor="#09263b" />
        </linearGradient>
        <linearGradient id={`${uid}-e-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe7ed" />
        </linearGradient>
        <linearGradient id={`${uid}-bars`} x1="0.2" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecbb66" />
          <stop offset="0.5" stopColor="#ad7731" />
          <stop offset="1" stopColor="#3a2915" />
        </linearGradient>
        <linearGradient id={`${uid}-tick`} gradientUnits="userSpaceOnUse" x1="0" y1="1250" x2="1254" y2="450">
          <stop offset="0" stopColor="#c18a3a" />
          <stop offset="0.22" stopColor="#8c5d22" />
          <stop offset="0.6" stopColor="#d9a453" />
          <stop offset="1" stopColor="#c48d3c" />
        </linearGradient>
      </defs>

      <path d={E_UPPER} fill={eFill} />
      <path d={E_LOWER} fill={eFill} />

      {BARS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill={`url(#${uid}-bars)`}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          initial={animated ? { scaleY: 0, opacity: 0 } : false}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={reduceMotion ? instant : { ...springRise, delay: 0.25 + i * 0.14 }}
        />
      ))}

      <motion.path
        d={TICK}
        fill={`url(#${uid}-tick)`}
        style={{ transformBox: 'fill-box', transformOrigin: '20% 90%' }}
        initial={animated ? { opacity: 0, scale: 0.6, x: -40 } : false}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={reduceMotion ? instant : { type: 'spring', stiffness: 170, damping: 16, delay: 0.85 }}
      />
    </svg>
  )
}
