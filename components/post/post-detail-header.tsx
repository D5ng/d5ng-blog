import { Post } from "@/lib/post.type"
import React from "react"
import PostDetailProfile from "./post-detail-profile"
import PostDetailReaction from "./post-detail-reaction"
import Image from "next/image"
import { Badge } from "../ui/badge"

export default function PostDetailHeader(props: Post) {
  return (
    <>
      <Badge className="mb-4 px-2.5 py-1">{props.categoryPath.toUpperCase()}</Badge>
      <h1>{props.title}</h1>
      <p className="text-neutral-500">{props.description}</p>
      <PostDetailProfile author={props.author} readingMinutes={props.readingMinutes} date={props.date} />
      <PostDetailReaction slug={props.slug} />
      <div className="relative w-full h-[63.333vw] max-h-[400px] lg:h-[39.063vw] lg:max-h-[450px] not-prose mt-10">
        <Image src={props.thumbnail} fill alt="thumnnail" objectFit="cover" objectPosition="center" />
      </div>
    </>
  )
}
