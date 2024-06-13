import { useAspect, useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import * as Shader from "./shader"

export default function Model(props: { image: string }) {
  const plane = useRef<
    THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial, THREE.Object3DEventMap>
  >(null!)

  const { viewport } = useThree()

  const texture = useTexture(props.image)
  const scale = useAspect(texture.image.width, texture.image.height, 0.3)

  scale[0] = viewport.width - 0.7
  scale[1] = viewport.height - 0.7

  const uniforms = useRef({
    vUvScale: { value: new THREE.Vector2(0, 0) },
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: 0.15 },
    uWaveLength: { value: 7 },
  })

  const scaleRatio = viewport.width / viewport.height
  const aspectRatio = texture.image.width / texture.image.height

  useFrame(() => {
    scaleRatio < aspectRatio
      ? plane.current!.material.uniforms.vUvScale.value.set(scaleRatio / aspectRatio, 1)
      : plane.current!.material.uniforms.vUvScale.value.set(1, aspectRatio / scaleRatio)

    plane.current!.material.uniforms.uTime.value += 0.04
    plane.current!.material.uniforms.uAmplitude.value = 0.15
    plane.current!.material.uniforms.uWaveLength.value = 7
  })

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 45, 45]} />
      <shaderMaterial vertexShader={Shader.vertex} fragmentShader={Shader.fragment} uniforms={uniforms.current} />
    </mesh>
  )
}
