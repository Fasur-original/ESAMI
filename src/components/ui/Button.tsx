import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

const button = cva(
  [
    'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-body font-medium',
    'transition-transform duration-200 ease-(--ease-spring) hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
    // Hover tint is a pseudo-layer so only opacity animates.
    'before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 active:before:opacity-100',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light',
    'disabled:pointer-events-none disabled:opacity-60',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-gold text-navy-deep shadow-glow before:bg-[linear-gradient(180deg,rgb(255_255_255/0.28),transparent)]',
        outlineLight:
          'text-paper ring-1 ring-paper/35 ring-inset before:bg-paper/10 focus-visible:outline-paper',
        outlineDark:
          'text-navy ring-1 ring-navy/25 ring-inset before:bg-navy/6 focus-visible:outline-navy',
      },
      size: {
        sm: 'px-4 py-2 text-[0.9375rem]',
        md: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type CommonProps = VariantProps<typeof button> & { className?: string; children: ReactNode }

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: never }

export type ButtonProps = LinkButtonProps | ActionButtonProps

/** Renders an `<a>` when given `href`, otherwise a `<button>`. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...rest } = props
    return (
      <a className={cn(button({ variant, size }), className)} {...rest}>
        {children}
      </a>
    )
  }

  const { variant, size, className, children, type = 'button', ...rest } = props
  return (
    <button type={type} className={cn(button({ variant, size }), className)} {...rest}>
      {children}
    </button>
  )
}
