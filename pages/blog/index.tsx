import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getAllPosts, getCategoryList } from "@/lib/post.lib"
import Link from "next/link"

export default function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ul>
        {props.categoryList.map((category) => (
          <li key={category}>
            <Link href={`/blog/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {props.postList.map((post) => (
          <li key={post.url}>
            <Link href={post.url}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps = (async () => {
  const categoryList = getCategoryList()
  const postList = getAllPosts()

  return {
    props: { categoryList, postList },
  }
}) satisfies GetStaticProps
