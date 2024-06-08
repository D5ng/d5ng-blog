import BadgeLink from "@/components/ui/badge-link"

interface Props {
  category: string
}

export default function CategoryItem(props: Props) {
  const categoryName = props.category
    .split("")
    .map((str, index) => (index === 0 ? str.toUpperCase() : str))
    .join("")

  return <BadgeLink href={`/blog/${props.category}`}>{categoryName}</BadgeLink>
}
