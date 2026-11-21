import Image from "next/image"
import type { ThumbnailFocus } from "@/lib/post-schema"
import type { PostMeta } from "@/lib/posts"

export const objectPosition: Record<ThumbnailFocus, string> = {
  center: "object-center",
  left: "object-left",
  right: "object-right",
  top: "object-top",
  bottom: "object-bottom",
}

// 행 왼쪽의 64px 썸네일이에요. 좁거나 손가락으로 쓰는 화면에서만 보여요.
// 데스크톱에서는 숨어 있어서 내려받지 않아요(지연 로드).
export function PostThumb({ post }: { post: PostMeta }) {
  return (
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
  )
}
