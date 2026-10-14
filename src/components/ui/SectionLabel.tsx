import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// The small gold triangle comes from the "A" in the ESAMI wordmark.
const label = cva('flex items-center gap-2.5 text-[0.9375rem] font-medium', {
  variants: {
    tone: {
      light: 'text-bronze',
      dark: 'text-gold-light',
    },
  },
  defaultVariants: { tone: 'light' },
})

type SectionLabelProps = VariantProps<typeof label> & {
  children: string
  className?: string
}

export function SectionLabel({ tone, children, className }: SectionLabelProps) {
  return (
    <p className={cn(label({ tone }), className)}>
      <svg viewBox="0 0 12 10" className="size-3 shrink-0 fill-gold" aria-hidden="true">
        <path d="M6 0 L12 10 L0 10 Z" />
      </svg>
      {children}
    </p>
  )
}
