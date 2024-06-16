import ReactLenis from "lenis/react"
import { PropsWithChildren, useRef } from "react"

export default function SmoothProvider(props: PropsWithChildren) {
  const lenisRef = useRef(null)

  return (
    <ReactLenis ref={lenisRef} autoRaf={true} options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }} root>
      {props.children}
    </ReactLenis>
  )
}
