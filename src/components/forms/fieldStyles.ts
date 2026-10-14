import { cva } from 'class-variance-authority'

export const fieldControl = cva(
  [
    'w-full rounded-lg bg-paper px-4 py-3 text-base text-navy ring-1 ring-line ring-inset placeholder:text-haze',
    'hover:ring-navy/30 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none active:ring-navy/40',
  ],
  {
    variants: {
      invalid: { true: 'ring-2 ring-alert hover:ring-alert focus-visible:ring-alert', false: '' },
    },
    defaultVariants: { invalid: false },
  },
)
