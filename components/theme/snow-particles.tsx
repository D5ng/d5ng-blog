import { useEffect, useRef } from "react"

interface Particles {
  x: number
  y: number
  r: number
  speedX: number
  speedY: number
}

const PARTICLES_COUNT = 15
const PARTICLES: Particles[] = []
const PARTICLES_RADIUS = 10
const PARTICLES_SPEED = 1

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

export default function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") return
    const ctx = canvasRef.current.getContext("2d")!

    const retinaDisplay = {
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
    }

    canvasRef.current.width = window.innerWidth * 2
    canvasRef.current.height = window.innerHeight * 2

    const draw = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"

      PARTICLES.forEach((particles) => {
        particles.x += particles.speedX
        particles.y += particles.speedY
        ctx?.beginPath()
        ctx.arc(particles.x, particles.y - particles.r * 2, particles.r, 0, Math.PI * 2)
        ctx.fill()

        if (particles.y - particles.r * 2 > retinaDisplay.height) {
          particles.y = -particles.r * 2
        }
      })
    }

    const animate = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, retinaDisplay.width, retinaDisplay.height)
      draw()
      requestAnimationFrame(() => animate(ctx))
    }

    const createParticles = () => {
      for (let i = 0; i < PARTICLES_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const x = random(0, retinaDisplay.width)
        const y = random(0, retinaDisplay.height)
        const r = random(3, PARTICLES_RADIUS)
        const speedX = Math.cos(angle) * random(-0.5, 0.5)
        const speedY = random(0.6, PARTICLES_SPEED)
        PARTICLES.push({ x, y, r, speedX, speedY })
      }
    }

    createParticles()
    animate(ctx)
  }, [])

  return <canvas ref={canvasRef} className="fixed w-screen h-screen left-0 top-0 -z-10" />
}
