import NextLink from "next/link"
import { categoryLabels } from "@/lib/category"
import { formatDate } from "@/lib/date"
import type { PostMeta } from "@/lib/posts"
import styles from "./post-index.module.css"
import { PostThumb } from "./post-thumb"

type Neighbors = { newer?: PostMeta; older?: PostMeta }

// 메인 목록과 같은 순서라서 새 글(다음 글)이 위에 와요.
export function PostNeighbors({ newer, older }: Neighbors) {
  const items = [
    { label: "다음 글", post: newer },
    { label: "이전 글", post: older },
  ].filter((item): item is { label: string; post: PostMeta } => item.post !== undefined)
  if (items.length === 0) return null

  return (
    <nav aria-label="이전 글과 다음 글" className="column">
      <ul className={`${styles.list} mb-[clamp(48px,6vw,96px)] border-t border-fg-neutral`}>
        {items.map(({ label, post }) => (
          <li key={post.slug} className="border-b border-stroke-neutral-muted">
            <NextLink
              href={`/posts/${post.slug}`}
              className={`${styles.row} grid grid-cols-12 items-baseline gap-x-20 py-[18px] focus-visible:-outline-offset-2 compact:grid-cols-[78px_auto_auto_minmax(0,1fr)] compact:items-center compact:gap-x-0 compact:gap-y-2 compact:py-[14px]`}
            >
              <span
                className={`${styles.fade} col-span-2 text-t3 font-medium text-fg-neutral-subtle compact:col-span-1 compact:col-start-2 compact:row-start-2 compact:self-start compact:text-t2`}
              >
                {label}
              </span>
              <span
                className={`${styles.fade} col-span-6 col-start-3 text-t7 font-medium compact:col-[2/-1] compact:row-start-1 compact:self-end compact:text-t6`}
              >
                <span className={styles.title}>{post.title}</span>
              </span>
              <span
                className={`${styles.fade} col-span-2 col-start-9 text-t4 text-fg-neutral-muted compact:col-span-1 compact:col-start-4 compact:row-start-2 compact:self-start compact:pl-4 compact:text-t2 compact:text-fg-neutral-subtle compact:before:content-['·_']`}
              >
                {categoryLabels[post.category]}
              </span>
              <time
                dateTime={post.date}
                className={`${styles.fade} col-span-2 col-start-11 justify-self-end text-t4 text-fg-neutral-subtle tabular-nums compact:col-span-1 compact:col-start-3 compact:row-start-2 compact:self-start compact:justify-self-start compact:pl-4 compact:text-t2 compact:before:content-['·_']`}
              >
                {formatDate(post.date)}
              </time>
              <PostThumb post={post} />
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
