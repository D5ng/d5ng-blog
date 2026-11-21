import NextLink from "next/link"
import { site } from "@/lib/site"
import { ExternalLink } from "./external-link"
import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-bg-layer-default pt-[env(safe-area-inset-top,0px)]">
      <div className="wrap flex h-[56px] items-center gap-24 text-t3 font-medium">
        <NextLink href="/" className="font-bold">
          {site.name}
        </NextLink>
        {/* 마지막 버튼의 안쪽 여백만큼 당겨서 글자가 바깥 여백 선에 맞아요. */}
        <nav aria-label="바깥 링크" className="-mr-[14px] ml-auto flex items-center gap-4">
          <ExternalLink href={site.oldBlog}>지금 블로그</ExternalLink>
          <ExternalLink href={site.github}>GitHub</ExternalLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
