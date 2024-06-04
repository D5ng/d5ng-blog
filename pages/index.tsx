import { GetStaticProps } from "next"
import { getAllPosts } from "@/lib/post.lib"

export default function HomePage() {
  return <div></div>
}

export const getStaticProps = (async () => {
  getAllPosts()
  return {
    props: {},
  }
}) satisfies GetStaticProps
