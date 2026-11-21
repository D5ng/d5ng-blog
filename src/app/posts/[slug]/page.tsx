import { Button } from "@d5ng/react"
import type { Metadata } from "next"
import Image from "next/image"
import NextLink from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "@/components/icons"
import { PostBar } from "@/components/post-bar"
import { PostNeighbors } from "@/components/post-neighbors"
import { objectPosition } from "@/components/post-thumb"
import { SiteFooter } from "@/components/site-footer"
import { categoryLabels } from "@/lib/category"
import { formatDate } from "@/lib/date"
import { getAllPosts, getPost } from "@/lib/posts"

const TITLE_ID = "post-title"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const post = getAllPosts().find((item) => item.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const { meta, content } = post
  const posts = getAllPosts()
  const index = posts.findIndex((item) => item.slug === slug)

  return (
    <>
      <PostBar title={meta.title} titleId={TITLE_ID} />
      <main id="main">
        <article aria-labelledby={TITLE_ID}>
          <header className="column pt-[clamp(40px,6vw,88px)]">
            <div className="mb-[clamp(28px,3vw,40px)]">
              <Button asChild variant="secondary" size="xsmall" prefixIcon={<ArrowLeftIcon />}>
                <NextLink href="/">목록</NextLink>
              </Button>
            </div>
            <h1 id={TITLE_ID} className="text-t14 font-medium text-balance narrow:text-t12">
              {meta.title}
            </h1>
            <p className="mt-[18px] text-t3 text-fg-neutral-subtle tabular-nums">
              약 {meta.readingMinutes}분 · <time dateTime={meta.date}>{formatDate(meta.date)}</time> ·{" "}
              {categoryLabels[meta.category]}
            </p>
            <div className="relative mt-[clamp(28px,3vw,40px)] aspect-video overflow-hidden rounded-lg bg-bg-neutral-weak">
              <Image
                src={meta.thumbnail}
                alt=""
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 800px) 720px, 90vw"
                className={`object-cover ${objectPosition[meta.thumbnailFocus]}`}
              />
            </div>
          </header>
          <div className="column pt-[clamp(32px,4vw,48px)] pb-[clamp(40px,5vw,72px)] text-article narrow:text-article-narrow">
            {content}
          </div>
        </article>
        <PostNeighbors newer={posts[index - 1]} older={posts[index + 1]} />
      </main>
      <SiteFooter />
    </>
  )
}
