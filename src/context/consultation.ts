import { createContext, useContext } from 'react'

export interface ConsultationContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const ConsultationContext = createContext<ConsultationContextValue | null>(null)

/** Opens and closes the site-wide "Book a consultation" dialog. */
export function useConsultation() {
  const value = useContext(ConsultationContext)
  if (!value) throw new Error('useConsultation must be used inside <ConsultationProvider>')
  return value
}
