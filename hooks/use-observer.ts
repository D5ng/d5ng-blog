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
    // const marginBottom = window.innerHeight * 0.5
    const observer = new IntersectionObserver(callback, {
      threshold: 1,
      rootMargin: `-${window.innerHeight * 0.4}px 0px -${window.innerHeight * 0.4}px 0px`,
    })
    elements.map((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [callback, elements])
}
