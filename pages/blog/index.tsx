import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getAllPosts, getCategoryList } from "@/lib/post.lib"
import Category from "@/components/category/category"
import PostItem from "@/components/post/post-item"

export default function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="mt-[50px]">
      <section className="flex justify-between items-center px-10">
        <span className="font-medium">CATEGORIES</span>
        <Category categoryList={props.categoryList} />
      </section>

      <section className="mt-[30px] px-10">
        <ul className="grid grid-cols-3 gap-4">
          {props.postList.map((post) => (
            <PostItem post={post} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export const getStaticProps = (async () => {
  const categoryList = getCategoryList()
  const postList = getAllPosts()

  return {
    props: { categoryList, postList },
  }
}) satisfies GetStaticProps
