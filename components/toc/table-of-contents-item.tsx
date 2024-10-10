import Link from "next/link"
import { Toc } from "@/lib/post.type"
import { MouseEvent } from "react"

interface Props {
  toc: Toc
  currentId: string
  id: string

  // eslint-disable-next-line no-unused-vars
  handleScrollTo: (id: string) => void
}

export default function TableOfContentsItem({ toc, currentId, id, handleScrollTo }: Props) {
  const href = id ? `#${id}` : "#"
  const isHeadingElement3 = toc.indent === 1
  const isHeading3ClassName = isHeadingElement3 ? "ml-4 text-xs py-0.5" : "text-sm"
  const activeClassName = `${currentId === toc.text.trim() ? "font-medium text-foreground dark:text-foreground" : "font-normal text-neutral-400 dark:text-neutral-400"} ${isHeading3ClassName}`

  const handleScroll = (event: MouseEvent) => {
    event.preventDefault()
    handleScrollTo(id)
  }

  return (
    <li className={activeClassName}>
      <Link href={href} onClick={handleScroll}>
        {toc.text}
      </Link>
    </li>
  )
}
