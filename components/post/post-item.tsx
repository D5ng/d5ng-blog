import Link from "next/link"
import Image from "next/image"
import dayjs from "dayjs"
import { Post } from "@/lib/post.type"
import { Badge } from "@/components/ui/badge"
import { MONTHS_EN } from "@/utils/format"

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  const month = MONTHS_EN[dayjs(post.date).month()]
  const day = dayjs(post.date).day()
  const year = dayjs(post.date).year()
  const formatDate = `${month} ${day}, ${year}`
  return (
    <li key={post.url} className="px-10 py-12 border group md:px-[2.93vw] lg:py-[2.963vw] ">
      <div className="flex justify-between items-center">
        <time className="text-sm" dateTime={post.date}>
          {formatDate}
        </time>
        <Badge variant="outline" className="px-2 py-1 font-medium">
          {post.publicCategory.toUpperCase()}
        </Badge>
      </div>
      <div className="w-full mt-5 sm:mt-10 relative h-[69.444vw] min-h-[250px] sm:h-[29.297vw] lg:h-[21.605vw] lg:h-max-[400px]">
        <Link href={post.url}>
          <Image src={post.thumbnail} alt="" className="w-full object-cover object-center block h-full" fill />
        </Link>
      </div>

      <div className="mt-5">
        <Link href={post.url}>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-overflow">{post.description}</p>
        </Link>
      </div>

      <div className="mt-5 sm:mt-10">
        <Link href={post.url} className="text-xs font-medium border-b">
          READ MORE
        </Link>
      </div>
    </li>
  )
}
