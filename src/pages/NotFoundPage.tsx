import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'

export function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-deep pt-28 pb-16 text-paper">
      <div aria-hidden="true" className="ledger-lines absolute inset-0 -z-10" />
      <Container>
        <h1 className="max-w-[16ch] text-[clamp(2.5rem,5vw,4rem)] font-normal">This page isn’t in our books.</h1>
        <p className="mt-6 max-w-[48ch] text-lg text-paper/75">
          The address may be mistyped, or the page may have moved. Head back to the home page to find what you need.
        </p>
        <Button href="/" className="mt-10">
          Go to the home page
        </Button>
      </Container>
    </section>
  )
}
