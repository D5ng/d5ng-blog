import Category from "@/components/category/category"
import CustomHead from "@/components/meta/custom-head"
import Post from "@/components/post/post"
import { getAllPosts, getCategoryList } from "@/lib/post.lib"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export default function HomePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <CustomHead />
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
