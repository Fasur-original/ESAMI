import { useEffect, useId, useRef, useState } from 'react'
import { enquiryForm } from '../../content/site'
import { useConsultation } from '../../context/consultation'
import { cn } from '../../lib/cn'
import { EnquiryForm } from '../forms/EnquiryForm'

export function ConsultationDialog() {
  const { isOpen, close } = useConsultation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [ready, setReady] = useState(false)

  const handleClose = () => {
    setReady(false)
    close()
  }

  // The native <dialog> handles focus trapping, Escape and the backdrop.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={handleClose}
      // A click that lands on the dialog element itself (not its content) is a backdrop click.
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className={cn(
        'mx-auto mt-auto mb-0 max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-2xl bg-paper p-0 text-navy shadow-lift',
        'sm:my-auto sm:max-h-[calc(100dvh-3rem)] sm:w-[min(44rem,calc(100vw-3rem))] sm:rounded-2xl',
        'backdrop:bg-navy-deep/75 backdrop:backdrop-blur-sm',
        'translate-y-0 opacity-100 transition-[opacity,translate] duration-300 ease-(--ease-spring) starting:translate-y-8 starting:opacity-0',
        'motion-reduce:transition-none',
      )}
    >
      <div className="relative bg-[linear-gradient(180deg,var(--color-mist),var(--color-paper)_9rem)] p-6 sm:p-10">
        <div className="pr-12">
          <h2 id={titleId} className="text-[2rem] font-normal">
            {enquiryForm.consultation.title}
          </h2>
          {!ready && <p className="mt-3 max-w-[52ch] text-[0.9875rem] text-slate">{enquiryForm.consultation.intro}</p>}
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 grid size-11 place-items-center rounded-full text-navy ring-1 ring-line transition-transform hover:scale-105 hover:ring-navy/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:scale-95 sm:top-8 sm:right-8"
        >
          <svg viewBox="0 0 14 14" aria-hidden="true" className="size-3.5 stroke-current stroke-[1.5]">
            <path d="M1 1 13 13M13 1 1 13" />
          </svg>
        </button>

        {/* Mounted only while open so each visit starts with a fresh form. */}
        {isOpen && <EnquiryForm intent="consultation" className="mt-8" onReadyChange={setReady} />}
      </div>
    </dialog>
  )
}
