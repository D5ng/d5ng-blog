import { Post } from "@/lib/post.type"
import React from "react"

export default function PostDetailHeader(props: Pick<Post, "title" | "description" | "thumbnail">) {
  return (
    <>
      <h1>{props.title}</h1>
      <p className="text-neutral-500">{props.description}</p>
    </>
  )
}
