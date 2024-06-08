import React from "react"
import { Badge } from "../ui/badge"
import CategoryItem from "./category-item"

interface CategoryProps {
  categoryList: string[]
}

export default function Category(props: CategoryProps) {
  return (
    <ul className="flex gap-x-2">
      <Badge variant="outline" className="px-3.5 py-2 font-medium hover:bg-primary hover:text-primary-foreground">
        ALL
      </Badge>
      {props.categoryList.map((category) => (
        <CategoryItem category={category} key={category} />
      ))}
    </ul>
  )
}
