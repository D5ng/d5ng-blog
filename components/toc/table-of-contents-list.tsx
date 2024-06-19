import React, { useEffect, useState } from "react"
import { Toc } from "@/lib/post.type"
import useObserver from "@/hooks/use-observer"
import TableOfContentsItem from "@/components/toc/table-of-contents-item"

interface Props {
  tocList: Toc[]
}

export default function TableOfContentsList(props: Props) {
  const [currentId, setCurrentId] = useState(props.tocList[0].text.trim())
  const [headingElements, setHeadingElements] = useState<HTMLElement[]>([])

  useObserver((entry) => {
    setCurrentId(entry.target.textContent!.trim())
  }, headingElements)

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2, h3")) as HTMLElement[]
    setHeadingElements(headingElements)
  }, [])

  return (
    <ul>
      {props.tocList.map((toc) => (
        <TableOfContentsItem key={toc.text} toc={toc} currentId={currentId} />
      ))}
    </ul>
  )
}
