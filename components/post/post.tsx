import React from "react"
import PostList from "./post-list"
import type { Post } from "@/lib/post.type"

interface Props {
  postList: Post[]
}

export default function Post(props: Props) {
  return (
    <section className="mt-[30px] px-10">
      <PostList postList={props.postList} />
    </section>
  )
}
