import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { getPostDetail, getPostPaths, parsePostAbstract, parseToc } from "@/lib/post.lib"
import { serialize } from "next-mdx-remote/serialize"
// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
// import rehypePrism from "rehype-prism-plus"
import PostDetailHeader from "@/components/post/post-detail-header"
import Giscus from "@/components/giscus"
import PostDetailBody from "@/components/post/post-detail-body"
import TableOfContents from "@/components/toc/table-of-contents"
import useResize from "@/hooks/use-resize"
import CustomHead from "@/components/meta/custom-head"

export default function PostDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const innerWidth = useResize()

  return (
    <>
      <CustomHead
        title={props.title}
        description={props.description}
        slug={[props.publicCategory, props.slug]}
        tag={props.categoryPath}
        image={props.thumbnail}
      />
      <section className="relative m-auto w-[90%] prose prose-neutral dark:prose-invert max-w-[680px] min-[1600px]:max-w-[800px]">
        <PostDetailHeader {...props} />
        <PostDetailBody {...props.mdxSource} />
        {innerWidth >= 1024 && <TableOfContents tocList={props.tocList} />}
        <Giscus />
      </section>
    </>
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
  const tocList = parseToc(post.content)

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
      tocList,
    },
  }
}) satisfies GetStaticProps
