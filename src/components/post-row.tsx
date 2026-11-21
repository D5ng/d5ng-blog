import Image from "next/image"
import NextLink from "next/link"
import { categoryLabels } from "@/lib/category"
import { formatDate } from "@/lib/date"
import type { ThumbnailFocus } from "@/lib/post-schema"
import type { PostMeta } from "@/lib/posts"
import styles from "./post-index.module.css"

const objectPosition: Record<ThumbnailFocus, string> = {
  center: "object-center",
  left: "object-left",
  right: "object-right",
  top: "object-top",
  bottom: "object-bottom",
}

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
        {/* 데스크톱에서는 숨어 있어서 내려받지 않아요(지연 로드). */}
        <span
          aria-hidden="true"
          className="relative hidden size-[64px] overflow-hidden rounded-md bg-bg-neutral-weak compact:col-start-1 compact:row-span-2 compact:row-start-1 compact:block"
        >
          <Image
            src={post.thumbnail}
            alt=""
            fill
            sizes="64px"
            className={`object-cover ${objectPosition[post.thumbnailFocus]}`}
          />
        </span>
      </NextLink>
    </li>
  )
}
