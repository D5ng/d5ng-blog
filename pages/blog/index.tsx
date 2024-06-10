import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getAllPosts, getCategoryList } from "@/lib/post.lib"
import Category from "@/components/category/category"
import Post from "@/components/post/post"

export default function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Category categoryList={props.categoryList} />
      <Post postList={props.postList} />
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
