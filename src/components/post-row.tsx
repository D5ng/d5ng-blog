import NextLink from "next/link"
import { categoryLabels } from "@/lib/category"
import { formatDate } from "@/lib/date"
import type { PostMeta } from "@/lib/posts"
import styles from "./post-index.module.css"
import { PostThumb } from "./post-thumb"

export function PostRow({ post }: { post: PostMeta }) {
  return (
    <li className="border-b border-stroke-neutral-muted">
      <NextLink
        href={`/posts/${post.slug}`}
        data-slug={post.slug}
        className={`${styles.row} grid grid-cols-12 items-baseline gap-x-20 py-[18px] focus-visible:-outline-offset-2 compact:grid-cols-[78px_auto_minmax(0,1fr)] compact:items-center compact:gap-x-0 compact:gap-y-2 compact:py-[14px]`}
      >
        <span
          className={`${styles.fade} col-span-8 text-t8 font-medium compact:col-span-2 compact:col-start-2 compact:row-start-1 compact:self-end compact:text-t6`}
        >
          <span className={styles.title}>{post.title}</span>
        </span>
        <span
          className={`${styles.fade} col-span-2 col-start-9 text-t4 text-fg-neutral-muted compact:col-span-1 compact:col-start-3 compact:row-start-2 compact:self-start compact:pl-4 compact:text-t2 compact:text-fg-neutral-subtle compact:before:content-['·_']`}
        >
          {categoryLabels[post.category]}
        </span>
        <time
          dateTime={post.date}
          className={`${styles.fade} col-span-2 col-start-11 justify-self-end text-t4 text-fg-neutral-subtle tabular-nums compact:col-span-1 compact:col-start-2 compact:row-start-2 compact:self-start compact:justify-self-start compact:text-t2`}
        >
          {formatDate(post.date)}
        </time>
        <PostThumb post={post} />
      </NextLink>
    </li>
  )
}
