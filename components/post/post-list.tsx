import React from "react"
import PostItem from "./post-item"
import type { Post } from "@/lib/post.type"

interface Props {
  postList: Post[]
}

export default function PostList(props: Props) {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {props.postList.map((post) => (
        <PostItem post={post} key={post.url} />
      ))}
    </ul>
  )
}
