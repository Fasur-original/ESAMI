import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ConsultationContext } from './consultation'

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return <ConsultationContext.Provider value={value}>{children}</ConsultationContext.Provider>
}
