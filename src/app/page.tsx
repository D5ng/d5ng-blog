import { Suspense } from "react"
import { Hero } from "@/components/hero"
import { PostIndex } from "@/components/post-index"
import { PostIndexView } from "@/components/post-index-view"
import { SiteFooter } from "@/components/site-footer"
import { TopBar } from "@/components/top-bar"
import type { CategoryCounts } from "@/lib/category"
import { getAllPosts } from "@/lib/posts"

export default function Home() {
  const posts = getAllPosts()
  const counts: CategoryCounts = {
    all: posts.length,
    tech: posts.filter((post) => post.category === "tech").length,
    essay: posts.filter((post) => post.category === "essay").length,
  }
  const years = posts.map((post) => Number(post.date.slice(0, 4)))
  const first = Math.min(...years)
  const last = Math.max(...years)
  const index = { posts, counts, years: `${first} — ${last}` }

  return (
    <>
      <TopBar />
      <main id="main">
        <Hero counts={counts} />
        <section aria-label="글 목록" className="wrap pb-[clamp(72px,9vw,140px)]">
          {/* 정적 HTML에는 fallback이 들어가요. 글 전체 목록이라 JS가 없어도, 검색 로봇에게도 글이 다 보여요. */}
          <Suspense fallback={<PostIndexView {...index} selected={null} />}>
            <PostIndex {...index} />
          </Suspense>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
