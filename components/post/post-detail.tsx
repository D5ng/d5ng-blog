import React from "react"
import type { Post } from "@/lib/post.type"

interface Props {
  post: Post
}

export default function PostDetail(props: Props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p className="text-neutral-500">{props.description}</p>
      <div className="flex items-center gap-x-3 border-t border-b border-neutral-200 px-2 py-4">
        <Profile />
        <div className="flex flex-col text-sm gap-y-0.5">
          <div className="flex text-neutral-600">
            <span>{props.author}</span>
            <span className="block px-1">·</span>
            <span>FE Developer</span>
          </div>
          <div className="flex text-neutral-400">
            <span>{props.readingMinutes} min read</span>
            <span className="block px-1">·</span>
            <span>{formatDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
