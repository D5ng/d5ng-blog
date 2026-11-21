import { Button } from "@d5ng/react"
import type { ReactNode } from "react"
import { ArrowUpRightIcon } from "./icons"

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button asChild variant="ghost" size="xsmall" suffixIcon={<ArrowUpRightIcon />}>
      <a href={href} target="_blank" rel="noopener">
        {children}
        <span className="sr-only"> (새 탭)</span>
      </a>
    </Button>
  )
}
