import { getAllPosts, getCategoryList } from "@/lib/post.lib"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"

export default function CategoryPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(props.posts)
  return (
    <ul>
      {props.posts.map((post) => (
        <li key={post.url}>
          <Link href={post.url}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticPaths = (async () => {
  const paths = getCategoryList().map((category) => ({ params: { category } }))
  return {
    paths,
    fallback: false,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const categoryQuery = context.params!.category as string
  const categoryList = getCategoryList()
  const posts = getAllPosts(categoryQuery)

  return {
    props: {
      categoryList,
      posts,
    },
  }
}) satisfies GetStaticProps
