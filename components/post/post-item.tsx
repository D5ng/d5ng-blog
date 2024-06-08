import Link from "next/link"
import dayjs from "dayjs"
import { Post } from "@/lib/post.type"
import { Badge } from "@/components/ui/badge"
import { MONTHS_EN } from "@/utils/format"

interface PostItemProps {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li key={post.url} className="px-10 py-12 border group">
      <div className="flex justify-between items-center">
        <time className="text-sm">
          {`${MONTHS_EN[dayjs(post.date).month()]} ${dayjs(post.date).day()} , ${dayjs(post.date).year()}`}
        </time>
        <Badge variant="outline" className="px-2 py-1 font-medium hover:bg-primary hover:text-primary-foreground">
          {post.publicCategory.toUpperCase()}
        </Badge>
      </div>
      <div className="w-full h-[350px] mt-10">
        <Link href={post.url}>
          <img src={post.thumbnail} alt="" className="w-full object-cover object-center block h-full" />
        </Link>
      </div>

      <div className="mt-5">
        <Link href={post.url}>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-overflow">{post.description}</p>
        </Link>
      </div>

      <div className="mt-10">
        <Link href={post.url} className="text-xs font-medium border-b">
          READ MORE
        </Link>
      </div>
    </li>
  )
}
