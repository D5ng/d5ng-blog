import { GetStaticProps } from "next"
// eslint-disable-next-line no-unused-vars
import { getCategory, getAllPosts, getPostPaths, parsePost } from "@/lib/post.lib"

export default function HomePage() {
  return <div></div>
}

export const getStaticProps = (async () => {
  getAllPosts()
  return {
    props: {},
  }
}) satisfies GetStaticProps
