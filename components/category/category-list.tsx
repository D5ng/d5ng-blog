import BadgeLink from "../ui/badge-link"
import CategoryItem from "./category-item"

interface Props {
  categoryList: string[]
}

export default function CategoryList(props: Props) {
  return (
    <ul className="flex gap-x-2">
      <BadgeLink href="/blog">ALL</BadgeLink>
      {props.categoryList.map((category) => (
        <CategoryItem category={category} key={category} />
      ))}
    </ul>
  )
}
