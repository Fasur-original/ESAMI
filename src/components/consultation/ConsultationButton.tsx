import { useConsultation } from '../../context/consultation'
import { Button, type ButtonProps } from '../ui/Button'

type ConsultationButtonProps = Omit<Extract<ButtonProps, { href?: never }>, 'onClick' | 'children'> & {
  /** Runs before the dialog opens, e.g. to close the mobile menu. */
  onBeforeOpen?: () => void
}

export function ConsultationButton({ onBeforeOpen, ...props }: ConsultationButtonProps) {
  const { open } = useConsultation()
  return (
    <Button
      {...props}
      aria-haspopup="dialog"
      onClick={() => {
        onBeforeOpen?.()
        open()
      }}
    >
      Book a consultation
    </Button>
  )
}
