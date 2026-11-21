"use client"

import { Button } from "@d5ng/react"
import { applyTheme, saveTheme } from "@/lib/theme"

// 문구는 CSS로 골라요. 첫 화면은 정적 HTML이라 서버는 지금 테마를 모르기 때문이에요.
export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"
    applyTheme(next)
    saveTheme(next)
  }

  return (
    <Button variant="ghost" size="xsmall" onClick={toggle}>
      <span className="in-data-[theme=dark]:hidden">
        다크<span className="sr-only"> 모드로 바꾸기</span>
      </span>
      <span className="hidden in-data-[theme=dark]:inline">
        라이트<span className="sr-only"> 모드로 바꾸기</span>
      </span>
    </Button>
  )
}
