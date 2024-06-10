import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Image from "next/image"
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
import PostDetailHeader from "@/components/post/post-detail-header"
import Giscus from "@/components/giscus"

export default function PostDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section className="m-auto w-[90%] prose prose-neutral dark:prose-invert max-w-[680px]">
      <Badge className="mb-4 px-2.5 py-1">{props.categoryPath.toUpperCase()}</Badge>
      <PostDetailHeader title={props.title} description={props.description} thumbnail={props.thumbnail} />
      <PostDetailProfile author={props.author} readingMinutes={props.readingMinutes} date={props.date} />

      <div className="relative w-full h-[63.333vw] max-h-[400px] lg:h-[39.063vw] lg:max-h-[450px] not-prose mt-10">
        <Image src={props.thumbnail} fill alt="thumnnail" objectFit="cover" objectPosition="center" />
      </div>
      <MDXRemote {...props.mdxSource} />
      <Giscus />
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
