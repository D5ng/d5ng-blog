import React from "react"
import TableOfContentsList from "@/components/toc/table-of-contents-list"
import { Toc } from "@/lib/post.type"

interface Props {
  tocList: Toc[]
}

export default function TableOfContents(props: Props) {
  return (
    <aside className="not-prose absolute h-full top-[150px] -right-[50px] translate-x-[100%]">
      <div className="sticky top-[100px]">
        <TableOfContentsList tocList={props.tocList} />
      </div>
    </aside>
  )
}
