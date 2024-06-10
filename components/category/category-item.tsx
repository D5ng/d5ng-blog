import BadgeLink from "@/components/ui/badge-link"
import { useRouter } from "next/router"

interface Props {
  category: string
}

export default function CategoryItem(props: Props) {
  const router = useRouter()
  const activeClass = router.query.category === props.category ? "bg-primary text-primary-foreground" : ""
  const categoryName = props.category
    .split("")
    .map((str, index) => (index === 0 ? str.toUpperCase() : str))
    .join("")

  return (
    <li>
      <BadgeLink href={`/blog/${props.category}`} className={activeClass}>
        {categoryName}
      </BadgeLink>
    </li>
  )
}
