import Link from "next/link"
import { Toc } from "@/lib/post.type"

interface Props {
  toc: Toc
  currentId: string
}

export default function TableOfContentsItem({ toc, currentId }: Props) {
  const isHeadingElement3 = toc.indent === 1
  const isHeading3ClassName = isHeadingElement3 ? "ml-4" : ""
  const activeClassName = `${currentId === toc.text.trim() ? "font-medium text-foreground dark:text-foreground" : "font-normal text-neutral-400 dark:text-neutral-400"} ${isHeading3ClassName}`
  return (
    <li className={activeClassName}>
      <Link href={toc.link}>{toc.text}</Link>
    </li>
  )
}
