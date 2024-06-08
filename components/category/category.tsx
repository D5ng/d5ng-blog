import React from "react"
import { Badge } from "../ui/badge"

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
        <Badge
          key={category}
          variant="outline"
          className="px-3.5 py-2 font-medium hover:bg-primary hover:text-primary-foreground"
        >
          {category
            .split("")
            .map((str, index) => (index === 0 ? str.toUpperCase() : str))
            .join("")}
        </Badge>
      ))}
    </ul>
  )
}
