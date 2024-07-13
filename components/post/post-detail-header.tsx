import React from "react"
import Image from "next/image"
import { Post } from "@/lib/post.type"
import PostDetailProfile from "./post-detail-profile"
import PostDetailReaction from "./post-detail-reaction"
import { Badge } from "../ui/badge"
import { transformedCategory } from "@/utils/category.utils"

export default function PostDetailHeader(props: Post) {
  const category = transformedCategory(props.publicCategory)
  return (
    <>
      <Badge className="mb-4 px-2.5 py-1">{category}</Badge>
      <h1>{props.title}</h1>
      <p className="text-neutral-500">{props.description}</p>
      <PostDetailProfile author={props.author} readingMinutes={props.readingMinutes} date={props.date} />
      <PostDetailReaction slug={props.slug} />
      <figure>
        <div className="relative w-full h-[63.333vw] max-h-[400px] lg:h-[39.063vw] lg:max-h-[500px] not-prose mt-10">
          <Image src={props.thumbnail} fill alt="thumnnail" objectFit="cover" objectPosition="center" />
        </div>
        <figcaption>
          <a
            href="https://kr.freepik.com/free-vector/hwalyeohan-3d-moyang-budong-baegyeong_13295354.htm#fromView=search&page=1&position=21&uuid=5ac311bc-708e-41ec-88bf-fc5f67745a0e"
            target="_blank"
          >
            작가 pikisuperstar 출처 Freepik
          </a>
        </figcaption>
      </figure>
    </>
  )
}
