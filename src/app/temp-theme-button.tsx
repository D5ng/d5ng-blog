"use client"

import { Button } from "@d5ng/react"
import { applyTheme, saveTheme } from "@/lib/theme"

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
