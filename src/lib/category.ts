import { categories, type Category } from "./post-schema"

export const categoryLabels: Record<Category, string> = {
  tech: "기술",
  essay: "생각",
}

// 주소의 ?category= 값이에요. 모르는 값은 전체로 봐요.
export function parseCategory(value: string | null): Category | null {
  return categories.find((category) => category === value) ?? null
}

export type CategoryCounts = Record<Category | "all", number>
