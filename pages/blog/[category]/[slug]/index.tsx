import { getPostDetail, getPostPaths, parsePostAbstract } from "@/lib/post.lib"
import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"

export default function PostDetailPage() {
  return <div>index</div>
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
  console.log(post)

  return {
    props: {
      post,
    },
  }
}) satisfies GetStaticProps
