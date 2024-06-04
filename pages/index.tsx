import { GetStaticProps } from "next"
import { getCategory, getPostPaths } from "@/lib/post.lib"

export default function HomePage() {
  return <div></div>
}

export const getStaticProps = (async () => {
  getCategory()
  console.log(getPostPaths())
  return {
    props: {},
  }
}) satisfies GetStaticProps
