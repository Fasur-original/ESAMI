import { useEffect, useRef, useState } from 'react'

/**
 * True once the sentinel element (placed at the top of the page) has scrolled
 * out of view. Uses an IntersectionObserver instead of a scroll listener.
 */
export function useScrolledPast<T extends HTMLElement>() {
  const sentinelRef = useRef<T>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { sentinelRef, scrolled }
}
