import { getAllPosts } from "@/lib/posts"
import { site } from "@/lib/site"
import { ExternalLink } from "./external-link"
import { ToTopButton } from "./to-top-button"

// 연도는 가장 최근 글의 해예요. 정적 화면을 만들 때는 new Date()를 쓸 수 없어서(cacheComponents) 글 날짜에서 가져와요.
export function SiteFooter() {
  const year = getAllPosts()[0]?.date.slice(0, 4)
  return (
    <footer className="wrap">
      <div className="flex flex-wrap items-center gap-x-24 gap-y-12 border-t border-fg-neutral pt-[22px] pb-[calc(32px+env(safe-area-inset-bottom,0px))] text-t3 font-medium phone:grid phone:grid-cols-[1fr_auto]">
        <span className="text-t2 font-regular text-fg-neutral-subtle tabular-nums">
          © {year} {site.name}
        </span>
        <div className="ml-auto flex items-center gap-4 phone:col-span-full phone:row-start-2 phone:-ml-[14px]">
          <ExternalLink href={site.oldBlog}>지금 블로그</ExternalLink>
          <ExternalLink href={site.github}>GitHub</ExternalLink>
        </div>
        <ToTopButton />
      </div>
    </footer>
  )
}
