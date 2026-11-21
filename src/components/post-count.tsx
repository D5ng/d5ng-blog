"use client"

import type { CategoryCounts } from "@/lib/category"
import { useCategory } from "./use-category"

// 칩으로 걸러진 글 수예요.
export function PostCount({ counts }: { counts: CategoryCounts }) {
  const [category] = useCategory()
  return `(${counts[category ?? "all"]})`
}
