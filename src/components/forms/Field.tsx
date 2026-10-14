import type { ReactNode } from 'react'

/** Visual "Optional" tag; screen readers get "(optional)" in the label text instead. */
export function OptionalTag() {
  return (
    <span aria-hidden="true" className="text-sm font-normal text-slate">
      Optional
    </span>
  )
}

interface FieldProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}

export function Field({ id, label, optional, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.9375rem] font-medium text-navy">
        <span>
          {label}
          {optional && <span className="sr-only"> (optional)</span>}
        </span>
        {optional && <OptionalTag />}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-alert">
          {error}
        </p>
      )}
    </div>
  )
}
