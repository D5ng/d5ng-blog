import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getCategoryList } from "@/lib/post.lib"
import Link from "next/link"

export default function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul>
      {props.categoryList.map((category) => (
        <li key={category}>
          <Link href={`blog/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = (async () => {
  const categoryList = getCategoryList()
  return {
    props: { categoryList },
  }
}) satisfies GetStaticProps
