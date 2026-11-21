"use client"

import { useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { parseCategory } from "@/lib/category"
import type { Category } from "@/lib/post-schema"

/**
 * 주소의 ?category= 를 읽고 바꿔요.
 * 바꿀 때는 replaceState라서 칩을 여러 번 눌러도 뒤로 가기 한 번에 이전 페이지로 나가요.
 * Next 라우터가 replaceState를 따라가므로 useSearchParams도 새 값을 받아요.
 */
export function useCategory() {
  const category = parseCategory(useSearchParams().get("category"))

  const setCategory = useCallback((next: Category | null) => {
    const url = new URL(window.location.href)
    if (next) url.searchParams.set("category", next)
    else url.searchParams.delete("category")
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`)
  }, [])

  return [category, setCategory] as const
}
