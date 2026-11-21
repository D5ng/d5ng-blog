import type { CategoryCounts } from "@/lib/category"
import type { Category } from "@/lib/post-schema"
import type { PostMeta } from "@/lib/posts"
import { CategoryChips } from "./category-chips"
import styles from "./post-index.module.css"
import { PostRow } from "./post-row"

export type PostIndexProps = {
  posts: PostMeta[]
  counts: CategoryCounts
  years: string
}

export function PostIndexView({
  posts,
  counts,
  years,
  selected,
  onSelect,
}: PostIndexProps & { selected: Category | null; onSelect?: (category: Category | null) => void }) {
  const shown = selected ? posts.filter((post) => post.category === selected) : posts
  return (
    <>
      <div className="mt-[clamp(28px,3.4vw,52px)] flex flex-wrap items-center gap-x-24 gap-y-8">
        <CategoryChips selected={selected} counts={counts} onSelect={onSelect} />
        <span className="ml-auto text-t2 text-fg-neutral-subtle tabular-nums phone:hidden">{years}</span>
      </div>
      <ol className={`${styles.list} mt-[10px] border-t border-fg-neutral`}>
        {shown.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ol>
    </>
  )
}
