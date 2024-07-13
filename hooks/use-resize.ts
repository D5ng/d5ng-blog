import { useEffect, useState } from "react"
import { throttle } from "@/utils/throttle.utils"

export default function useResize() {
  const [innerWidth, setInnerWidth] = useState(0)

  useEffect(() => {
    if (window === undefined) return
    const handleResize = () => setInnerWidth(window.innerWidth)
    window.addEventListener("resize", throttle(handleResize, 500))
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return innerWidth
}
