import { useRouter } from "next/router"
import BadgeLink from "../ui/badge-link"
import CategoryItem from "./category-item"

interface Props {
  categoryList: string[]
}

export default function CategoryList(props: Props) {
  const router = useRouter()
  const activeClass = router.pathname === "/blog" ? "bg-primary text-primary-foreground" : ""

  return (
    <ul className="flex gap-x-2">
      <BadgeLink href="/blog" className={activeClass}>
        ALL
      </BadgeLink>
      {props.categoryList.map((category) => (
        <CategoryItem category={category} key={category} />
      ))}
    </ul>
  )
}
