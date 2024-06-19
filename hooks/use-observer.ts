import { useCallback, useEffect } from "react"

// eslint-disable-next-line no-unused-vars
type Callback = (entry: IntersectionObserverEntry) => void

export default function useObserver(onIntersect: Callback, elements: HTMLElement[]) {
  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry)
      })
    },
    [onIntersect],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(callback)
    elements.map((element) => observer.observe(element))
  }, [callback, elements])
}
