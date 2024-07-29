import Category from "@/components/category/category"
import { getAllPosts, getCategoryList } from "@/lib/post.lib"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Post from "@/components/post/post"
import CustomHead from "@/components/meta/custom-head"

export default function CategoryPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <CustomHead title={`D5ng Blog - ${props.categoryQuery}`} slug={[props.categoryQuery]} tag={props.categoryQuery} />
      <Category categoryList={props.categoryList} />
      <Post postList={props.postList} />
    </>
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
  const postList = getAllPosts(categoryQuery)

  return {
    props: {
      categoryList,
      postList,
      categoryQuery,
    },
  }
}) satisfies GetStaticProps
