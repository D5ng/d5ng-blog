import React from "react"
import PostItem from "./post-item"
import type { Post } from "@/lib/post.type"

interface Props {
  postList: Post[]
}

export default function PostList(props: Props) {
  return (
    <ul className="grid gap-y-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4">
      {props.postList.map((post) => (
        <PostItem post={post} key={post.url} />
      ))}
    </ul>
  )
}
