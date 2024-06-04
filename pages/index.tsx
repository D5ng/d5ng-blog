import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getCategoryList } from "@/lib/post.lib"

export default function HomePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {props.categoryList.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  )
}

export const getStaticProps = (async () => {
  const categoryList = getCategoryList()
  return {
    props: {
      categoryList,
    },
  }
}) satisfies GetStaticProps
