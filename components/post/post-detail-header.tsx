import { Post } from "@/lib/post.type"
import React from "react"
import PostDetailProfile from "./post-detail-profile"
import PostDetailReaction from "./post-detail-reaction"

export default function PostDetailHeader(props: Post) {
  return (
    <>
      <h1>{props.title}</h1>
      <p className="text-neutral-500">{props.description}</p>
      <PostDetailProfile author={props.author} readingMinutes={props.readingMinutes} date={props.date} />
      <PostDetailReaction slug={props.slug} />
    </>
  )
}
