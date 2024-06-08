import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { getPostDetail, getPostPaths, parsePostAbstract } from "@/lib/post.lib"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
// import rehypePrism from "rehype-prism-plus"
import { Badge } from "@/components/ui/badge"
import PostDetailProfile from "@/components/post/post-detail-profile"

export default function PostDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section className="m-auto prose prose-neutral dark:prose-invert max-w-[680px]">
      <Badge className="mb-4 px-2.5 py-1">{props.categoryPath.toUpperCase()}</Badge>
      <h1>{props.title}</h1>
      <p className="text-neutral-500">{props.description}</p>
      <PostDetailProfile author={props.author} readingMinutes={props.readingMinutes} date={props.date} />
      <MDXRemote {...props.mdxSource} />
    </section>
  )
}

export const getStaticPaths = (async () => {
  const paths = getPostPaths()
    .map((path) => parsePostAbstract(path))
    .map((data) => ({ params: { category: data.categoryPath, slug: data.slug } }))

  return {
    paths,
    fallback: false,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const category = context.params!.category as string
  const slug = context.params!.slug as string
  const post = getPostDetail(category, slug)

  const mdxSource = await serialize(post.content, {
    scope: {},
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkBreaks],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, { theme: { dark: "github-dark-dimmed", light: "github-light" } }],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
    },
  })

  return {
    props: {
      ...post,
      mdxSource,
    },
  }
}) satisfies GetStaticProps
