import { Canvas } from "@react-three/fiber"
import Model from "./model"

export default function Scene(props: { image: string }) {
  return (
    <Canvas>
      <Model image={props.image} />
    </Canvas>
  )
}
