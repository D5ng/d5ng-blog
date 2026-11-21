import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPost } from "@/lib/posts"

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

  const { meta, content, toc } = post
  return (
    <main>
      <article>
        <h1>{meta.title}</h1>
        <p>
          <time dateTime={meta.date}>{meta.date}</time> · {meta.category} · {meta.readingMinutes}분
        </p>
        <p>{meta.description}</p>
        {toc.length > 0 && (
          <nav aria-label="목차">
            <ol>
              {toc.map((item) => (
                <li key={item.id} data-depth={item.depth}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {content}
      </article>
    </main>
  )
}
