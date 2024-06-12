import Link from "next/link"
import Image from "next/image"
import dayjs from "dayjs"
import { Post } from "@/lib/post.type"
import { Badge } from "@/components/ui/badge"
import { MONTHS_EN } from "@/utils/index.utils"

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  const month = MONTHS_EN[dayjs(post.date).month()]
  const day = dayjs(post.date).day()
  const year = dayjs(post.date).year()
  const formatDate = `${month} ${day}, ${year}`
  return (
    <li key={post.url} className="px-10 py-12 border group md:px-[2.93vw] lg:py-[2.963vw] ">
      <div className="flex justify-between items-center">
        <time className="text-sm" dateTime={post.date}>
          {formatDate}
        </time>
        <Badge variant="outline" className="px-2 py-1 font-medium">
          {post.publicCategory.toUpperCase()}
        </Badge>
      </div>
      <div className="w-full mt-5 sm:mt-10 relative h-[69.444vw] min-h-[250px] sm:h-[29.297vw] lg:h-[21.605vw] lg:h-max-[400px]">
        <Link href={post.url}>
          <Scene image={post.thumbnail} />
          {/* <Image src={post.thumbnail} alt="" className="w-full object-cover object-center block h-full" fill /> */}
        </Link>
      </div>

      <div className="mt-5">
        <Link href={post.url}>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-overflow">{post.description}</p>
        </Link>
      </div>

      <div className="mt-5 sm:mt-10">
        <Link href={post.url} className="text-xs font-medium border-b">
          READ MORE
        </Link>
      </div>
    </li>
  )
}

import { Canvas, useFrame, useThree } from "@react-three/fiber"
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

// export default function HomePage() {
//   return (
//     <section className="h-screen">
//       <Scene />
//     </section>
//   )
// }

function Model(props: { image: string }) {
  const { setImage, amplitude, waveLength } = useControls({
    setImage: { value: 0.3, min: 0.1, max: 1, step: 0.05 },
    amplitude: { value: 0.25, min: 0, max: 5, step: 0.05 },
    waveLength: { value: 3, min: 0, max: 20, step: 1 },
  })

  const plane = useRef<any>(null)

  const { viewport } = useThree()

  const texture = useTexture(props.image)
  const { width, height } = texture.image
  const scale = useAspect(width, height, setImage)

  console.log(viewport.aspect, scale[0], scale[1])

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

function Scene(props: { image: string }) {
  return (
    <Canvas>
      <Model image={props.image} />
    </Canvas>
  )
}
