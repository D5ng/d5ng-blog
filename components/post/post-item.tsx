import Link from "next/link"
import { Post } from "@/lib/post.type"
import { Badge } from "@/components/ui/badge"

import Scene from "../three/scene"
import { formatDate } from "@/utils/date.utils"
import { transformedCategory } from "@/utils/category.utils"

interface Props {
  post: Post
}

export default function PostItem({ post }: Props) {
  const date = formatDate(post.date)
  const category = transformedCategory(post.publicCategory)
  return (
    <li key={post.url} className="px-6 py-8 border group md:px-[2.93vw] lg:py-[2.963vw] ">
      <div className="flex justify-between items-center">
        <time className="text-sm" dateTime={post.date}>
          {date}
        </time>
        <Badge variant="outline" className="px-2 py-1 font-medium">
          {category}
        </Badge>
      </div>
      <div className="w-full mt-5 sm:mt-10 relative h-[69.444vw] min-h-[250px] sm:h-[29.297vw] lg:h-[21.605vw] lg:h-max-[400px]">
        <Link href={post.url}>
          <Scene image={post.thumbnail} />
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
