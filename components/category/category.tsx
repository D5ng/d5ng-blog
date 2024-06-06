import React from "react"
import { Badge } from "../ui/badge"

interface CategoryProps {
  categoryList: string[]
}

export default function Category(props: CategoryProps) {
  return (
    <ul>
      {props.categoryList.map((category) => (
        <Badge key={category}>{category}</Badge>
      ))}
    </ul>
  )
}
