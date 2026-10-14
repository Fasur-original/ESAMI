import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge about the custom shadow tokens so they override cleanly.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { shadow: [{ shadow: ['lift', 'glow'] }] } },
})

/** Joins class names; later Tailwind classes win over conflicting earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
