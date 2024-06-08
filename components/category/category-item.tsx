import { Badge } from "../ui/badge"

interface Props {
  category: string
}

export default function CategoryItem(props: Props) {
  const categoryName = props.category
    .split("")
    .map((str, index) => (index === 0 ? str.toUpperCase() : str))
    .join("")

  return (
    <Badge variant="outline" className="px-3.5 py-2 font-medium hover:bg-primary hover:text-primary-foreground">
      {categoryName}
    </Badge>
  )
}
