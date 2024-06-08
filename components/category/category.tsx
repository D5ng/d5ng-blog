import CategoryItem from "@/components/category//category-item"
import BadgeLink from "@/components/ui/badge-link"

interface CategoryProps {
  categoryList: string[]
}

export default function Category(props: CategoryProps) {
  return (
    <ul className="flex gap-x-2">
      <BadgeLink href="/">ALL</BadgeLink>
      {props.categoryList.map((category) => (
        <CategoryItem category={category} key={category} />
      ))}
    </ul>
  )
}
