import { GetStaticProps } from "next"
import { getCategory } from "@/lib/post.lib"

export default function HomePage() {
  return <div></div>
}

export const getStaticProps = (async () => {
  getCategory()
  return {
    props: {},
  }
}) satisfies GetStaticProps
