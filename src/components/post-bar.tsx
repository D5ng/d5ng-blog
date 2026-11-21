"use client"

import NextLink from "next/link"
import { useEffect, useRef, useState } from "react"
import { site } from "@/lib/site"
import styles from "./post-bar.module.css"
import { ThemeToggle } from "./theme-toggle"

// 바 높이(56px)에 여유를 조금 둔 값이에요. 제목 아래 끝이 이 선을 넘으면 바에 제목을 보여요.
const PAST_LINE = 64

export function PostBar({ title, titleId }: { title: string; titleId: string }) {
  const [past, setPast] = useState(false)
  const progress = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const heading = document.getElementById(titleId)
    if (!heading) return
    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting && entry.boundingClientRect.top < PAST_LINE),
      { rootMargin: `-${PAST_LINE}px 0px 0px 0px` },
    )
    observer.observe(heading)
    return () => observer.disconnect()
  }, [titleId])

  useEffect(() => {
    const line = progress.current
    if (!line || CSS.supports("animation-timeline: scroll()")) return
    let frame = 0
    function update() {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      line!.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <header
      data-past={past || undefined}
      className={`${styles.bar} sticky top-0 z-30 bg-bg-layer-default pt-[env(safe-area-inset-top,0px)]`}
    >
      <div className="wrap flex h-[56px] items-center gap-24 text-t3 font-medium">
        <NextLink href="/" className="flex-none font-bold">
          {site.name}
        </NextLink>
        <span aria-hidden="true" className={`${styles.title} min-w-0 flex-1 truncate text-center narrow:hidden`}>
          {title}
        </span>
        <div className="-mr-[14px] ml-auto flex-none">
          <ThemeToggle />
        </div>
      </div>
      <div aria-hidden="true" className="h-px bg-stroke-neutral-muted">
        <span ref={progress} className={`${styles.progress} block h-full bg-fg-neutral`} />
      </div>
    </header>
  )
}
