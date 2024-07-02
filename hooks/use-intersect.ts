import { useCallback, useEffect } from "react"

// eslint-disable-next-line no-unused-vars
type IntersectHandler = (entry: IntersectionObserverEntry) => void

export default function useIntersect(headingElements: HTMLHeadingElement[], onIntersect: IntersectHandler) {
  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry)
      })
    },
    [onIntersect],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 0.4, rootMargin: "-76px 0px -30vh 0px" })
    headingElements.map((headingElement) => observer.observe(headingElement))

    return () => observer.disconnect()
  }, [callback, headingElements])

  return
}
