import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { getPostDetail, getPostPaths, parsePostAbstract } from "@/lib/post.lib"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

export default function PostDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.description}</div>
      <div>읽는 시간: {props.readingMinutes}분</div>
      <div>{props.categoryPath}</div>
      <MDXRemote {...props.mdxSource} />
    </div>
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

import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji"

import rehypeSlug from "rehype-slug"
import rehypePrism from "rehype-prism-plus"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

export const getStaticProps = (async (context) => {
  const category = context.params!.category as string
  const slug = context.params!.slug as string
  const post = getPostDetail(category, slug)

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkBreaks],
      rehypePlugins: [
        rehypeSlug,
        rehypePrism,
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
      format: "mdx",
    },
  })

  return {
    props: {
      ...post,
      mdxSource,
    },
  }
}) satisfies GetStaticProps
