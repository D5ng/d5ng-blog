import BadgeLink from "@/components/ui/badge-link"
import { transformedCategory } from "@/utils/category.utils"
import { useRouter } from "next/router"

interface Props {
  category: string
}

export default function CategoryItem(props: Props) {
  const router = useRouter()
  const category = transformedCategory(props.category)
  const activeClass = router.query.category === props.category ? "bg-primary text-primary-foreground" : ""

  return (
    <BadgeLink href={`/${props.category}`} className={activeClass}>
      {category}
    </BadgeLink>
  )
}
