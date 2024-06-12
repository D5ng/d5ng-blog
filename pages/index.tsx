import { Canvas, useFrame } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useControls } from "leva"
import { useRef } from "react"

// vec3 newPosition = position;
const vertex = `
  uniform float uAmplitude;
  uniform float uWaveLength;
  uniform float uTime;
  varying vec2 vUv;

  void main(){
    vec3 newPosition = position;
    float wave = sin(position.x * uWaveLength + uTime) * uAmplitude;
    newPosition.z += wave;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
  }
`

const fragment = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 color = texture(uTexture, vUv);
	  gl_FragColor = color;
  }
`

export default function HomePage() {
  return (
    <section className="h-screen">
      <Scene />
    </section>
  )
}

function Model() {
  const { amplitude, waveLength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 5, step: 0.05 },
    waveLength: { value: 3, min: 0, max: 20, step: 1 },
  })

  const plane = useRef<any>(null)

  const texture = useTexture("/posts/bootcamp/codeit-1/thumbnail.jpg")
  const { width, height } = texture.image
  const scale = useAspect(width, height, 0.1)

  console.log(width, height)

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  })

  useFrame(() => {
    plane.current!.material.uniforms.uTime.value += 0.04
    plane.current!.material.uniforms.uAmplitude.value = amplitude
    plane.current!.material.uniforms.uWaveLength.value = waveLength
  })

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[3, 3, 45, 45]} />
      {/* <meshBasicMaterial color="red" side={2} wireframe={true}  /> */}
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        // wireframe
      />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas>
      <Model />
    </Canvas>
  )
}
