import React from "react"
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

export const getStaticProps = (async (context) => {
  const category = context.params!.category as string
  const slug = context.params!.slug as string
  const post = getPostDetail(category, slug)
  const mdxSource = await serialize(post.content)

  return {
    props: {
      ...post,
      mdxSource,
    },
  }
}) satisfies GetStaticProps
