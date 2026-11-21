import { z } from "zod"

export const categories = ["tech", "essay"] as const
export type Category = (typeof categories)[number]

export const thumbnailFocuses = ["center", "left", "right", "top", "bottom"] as const
export type ThumbnailFocus = (typeof thumbnailFocuses)[number]

export const postFrontmatter = z.object({
  title: z.string().min(1),
  // gray-matter(YAML)는 2024-12-20을 Date로 읽어서 문자열로 되돌려요.
  date: z.preprocess((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value), z.iso.date()),
  category: z.enum(categories),
  description: z.string().min(1),
  thumbnailFocus: z.enum(thumbnailFocuses).default("center"),
  // true면 프로덕션 빌드에서 빠져요.
  draft: z.boolean().default(false),
})

export type PostFrontmatter = z.infer<typeof postFrontmatter>
