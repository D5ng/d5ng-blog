"use client"

import { Button } from "@d5ng/react"
import { applyTheme, saveTheme } from "@/lib/theme"

// TODO: 3단계에서 헤더의 ThemeToggle이 생기면 이 파일과 임시 페이지를 지워요.
export function TempThemeButton() {
  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"
    applyTheme(next)
    saveTheme(next)
  }

  return (
    <Button variant="secondary" size="small" onClick={toggle}>
      라이트·다크 바꾸기
    </Button>
  )
}
