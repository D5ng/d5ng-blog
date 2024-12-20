import { Canvas } from "@react-three/fiber"
import Model from "./model"
import Image from "next/image"

export default function Scene(props: { image: string }) {
  return (
    <>
      <Image src={props.image} alt="post thumnbnail" fill className="hidden" />
      <Canvas>
        <Model image={props.image} />
      </Canvas>
    </>
  )
}
