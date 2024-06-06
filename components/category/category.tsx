import React from "react"
import { Badge } from "../ui/badge"

interface CategoryProps {
  categoryList: string[]
}

export default function Category(props: CategoryProps) {
  return (
    <ul className="flex gap-x-4">
      {props.categoryList.map((category) => (
        <Badge key={category} variant="outline" className="px-3 py-2">
          {category}
        </Badge>
      ))}
    </ul>
  )
}
