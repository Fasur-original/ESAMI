import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { company, enquiryForm, services } from '../../content/site'
import { buildEnquiryEmail, type EnquiryDetails, type EnquiryEmail, type EnquiryIntent } from '../../lib/enquiryEmail'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Field, OptionalTag } from './Field'
import { fieldControl } from './fieldStyles'

interface EnquiryFormProps {
  intent: EnquiryIntent
  className?: string
  /** Lets the surrounding card hide its intro once the email is ready. */
  onReadyChange?: (ready: boolean) => void
}

type Errors = Partial<Record<'name' | 'message', string>>

const emptyDetails: EnquiryDetails = {
  name: '',
  organisation: '',
  organisationType: '',
  phone: '',
  services: [],
  message: '',
}

const MESSAGE_LIMIT = 1500

export function EnquiryForm({ intent, className, onReadyChange }: EnquiryFormProps) {
  const id = useId()
  const [details, setDetails] = useState<EnquiryDetails>(emptyDetails)
  const [errors, setErrors] = useState<Errors>({})
  const [email, setEmail] = useState<EnquiryEmail | null>(null)
  const [copied, setCopied] = useState(false)
  const sentHeadingRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (email) sentHeadingRef.current?.focus()
  }, [email])

  const update = <K extends keyof EnquiryDetails>(key: K, value: EnquiryDetails[K]) => {
    setDetails((prev) => ({ ...prev, [key]: value }))
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const toggleService = (title: string) =>
    update(
      'services',
      details.services.includes(title) ? details.services.filter((s) => s !== title) : [...details.services, title],
    )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!details.name.trim()) nextErrors.name = enquiryForm.errors.name
    if (!details.message.trim()) nextErrors.message = enquiryForm.errors.message
    setErrors(nextErrors)

    if (nextErrors.name) return nameRef.current?.focus()
    if (nextErrors.message) return messageRef.current?.focus()

    const built = buildEnquiryEmail(company.email, intent, details)
    setEmail(built)
    setCopied(false)
    onReadyChange?.(true)
    window.location.href = built.href
  }

  const copyMessage = async () => {
    if (!email) return
    try {
      await navigator.clipboard.writeText(`To: ${company.email}\nSubject: ${email.subject}\n\n${email.body}`)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (email) {
    return (
      <div className={cn('text-navy', className)} role="status">
        <h3 ref={sentHeadingRef} tabIndex={-1} className="text-[1.75rem] font-normal focus-visible:outline-none">
          {enquiryForm.sent.title}
        </h3>
        <p className="mt-3 text-slate">{enquiryForm.sent.body}</p>
        <p className="mt-6 text-[0.9375rem] text-slate">
          {enquiryForm.sent.fallback}{' '}
          <a
            href={`mailto:${company.email}`}
            className="rounded-sm font-medium break-all text-navy underline decoration-gold underline-offset-4 transition-opacity hover:opacity-75 active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {company.email}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={copyMessage} variant="outlineDark" size="sm">
            {copied ? 'Message copied' : 'Copy message'}
          </Button>
          <Button href={email.href} variant="outlineDark" size="sm">
            Open email app again
          </Button>
          <Button
            onClick={() => {
              setEmail(null)
              onReadyChange?.(false)
            }}
            variant="outlineDark"
            size="sm"
          >
            Edit message
          </Button>
        </div>
      </div>
    )
  }

  const fid = (name: string) => `${id}-${name}`
  const describedBy = (name: keyof Errors) => (errors[name] ? `${fid(name)}-error` : undefined)

  return (
    <form noValidate onSubmit={handleSubmit} className={cn('grid gap-5 sm:grid-cols-2', className)}>
      <Field id={fid('name')} label="Your name" error={errors.name}>
        <input
          ref={nameRef}
          id={fid('name')}
          name="name"
          autoComplete="name"
          required
          value={details.name}
          onChange={(e) => update('name', e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          className={fieldControl({ invalid: Boolean(errors.name) })}
        />
      </Field>

      <Field id={fid('organisation')} label="Organisation" optional>
        <input
          id={fid('organisation')}
          name="organisation"
          autoComplete="organization"
          value={details.organisation}
          onChange={(e) => update('organisation', e.target.value)}
          className={fieldControl()}
        />
      </Field>

      <Field id={fid('organisationType')} label="Type of organisation" optional>
        <div className="relative">
          <select
            id={fid('organisationType')}
            name="organisationType"
            value={details.organisationType}
            onChange={(e) => update('organisationType', e.target.value)}
            className={cn(fieldControl(), 'appearance-none pr-10')}
          >
            <option value="">Choose one</option>
            {enquiryForm.organisationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 12 8"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 w-3 -translate-y-1/2 fill-none stroke-slate stroke-[1.5]"
          >
            <path d="M1 1.5 6 6.5 11 1.5" />
          </svg>
        </div>
      </Field>

      <Field id={fid('phone')} label="Phone or WhatsApp" optional>
        <input
          id={fid('phone')}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={details.phone}
          onChange={(e) => update('phone', e.target.value)}
          className={fieldControl()}
        />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-3 flex w-full items-baseline justify-between gap-3 text-[0.9375rem] font-medium text-navy">
          <span>
            Services you’re interested in<span className="sr-only"> (optional)</span>
          </span>
          <OptionalTag />
        </legend>
        <div className="flex flex-wrap gap-2">
          {services.items.map((service) => {
            const checked = details.services.includes(service.title)
            return (
              <label key={service.title} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="services"
                  value={service.title}
                  checked={checked}
                  onChange={() => toggleService(service.title)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.875rem] ring-1 ring-inset transition-transform duration-200 active:scale-95',
                    'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold',
                    checked ? 'bg-navy text-paper ring-navy' : 'bg-paper text-navy ring-line hover:ring-navy/35',
                  )}
                >
                  <svg viewBox="0 0 12 10" aria-hidden="true" className={cn('size-2.5 fill-gold', !checked && 'hidden')}>
                    <path d="M6 0 L12 10 L0 10 Z" />
                  </svg>
                  {service.title}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <Field id={fid('message')} label={enquiryForm.messageLabel[intent]} error={errors.message} className="sm:col-span-2">
        <textarea
          ref={messageRef}
          id={fid('message')}
          name="message"
          rows={5}
          required
          maxLength={MESSAGE_LIMIT}
          placeholder={enquiryForm.messagePlaceholder}
          value={details.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={cn(fieldControl({ invalid: Boolean(errors.message) }), 'resize-y leading-[1.6]')}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">Sent to {company.email}</p>
        <Button type="submit">{enquiryForm.submitLabel}</Button>
      </div>
    </form>
  )
}
