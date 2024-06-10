import React from "react"
import Profile from "../profile/profile"
import { Post } from "@/lib/post.type"
import dayjs from "dayjs"
import { MONTHS_EN } from "@/utils/format"

export default function PostDetailProfile(props: Pick<Post, "author" | "readingMinutes" | "date">) {
  const month = MONTHS_EN[dayjs(props.date).month()]
  const day = dayjs(props.date).day()
  const year = dayjs(props.date).year()
  const formatDate = `${month} ${day}, ${year}`

  return (
    <div className="flex items-center gap-x-3 border-t border-b border-neutral-200 px-2 py-4 dark:border-neutral-700">
      <Profile />
      <div className="flex flex-col text-sm gap-y-0.5">
        <div className="flex text-neutral-600 dark:text-white">
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
  )
}
