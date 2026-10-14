import { cn } from '../../lib/cn'
import { company } from '../../content/site'
import { EsamiMark } from './EsamiMark'

interface LogoProps {
  tone?: 'brand' | 'onDark'
  className?: string
}

export function Logo({ tone = 'brand', className }: LogoProps) {
  const onDark = tone === 'onDark'
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <EsamiMark tone={tone} className="size-10 shrink-0" title="" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[1.6rem] font-semibold tracking-[0.02em]', onDark ? 'text-paper' : 'text-navy')}>
          {company.name}
        </span>
        <span className={cn('mt-1 text-[0.5625rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase', onDark ? 'text-haze' : 'text-slate')}>
          {company.tagline}
        </span>
      </span>
    </span>
  )
}
