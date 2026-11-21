"use client"

import { Button } from "@d5ng/react"
import { ArrowUpIcon } from "./icons"

export function ToTopButton() {
  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <Button variant="ghost" size="xsmall" suffixIcon={<ArrowUpIcon />} className="-mr-[14px]" onClick={toTop}>
      맨 위로
    </Button>
  )
}
