"use client"

import { PostIndexView, type PostIndexProps } from "./post-index-view"
import { useCategory } from "./use-category"

export function PostIndex(props: PostIndexProps) {
  const [category, setCategory] = useCategory()
  return <PostIndexView {...props} selected={category} onSelect={setCategory} />
}
