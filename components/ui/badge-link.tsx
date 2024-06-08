import Link, { LinkProps } from "next/link"
import React, { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<LinkProps> {
  className?: string
}

export default function BadgeLink(props: Props) {
  const defaultClass =
    "inline-flex items-center rounded-full border px-3.5 py-2 text-xs transition-colors text-foreground font-medium hover:bg-primary hover:text-primary-foreground"
  return (
    <Link href={props.href} className={`${defaultClass} ${props.className}`}>
      {props.children}
    </Link>
  )
}
