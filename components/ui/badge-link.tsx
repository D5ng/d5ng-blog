import Link, { LinkProps } from "next/link"
import React, { PropsWithChildren } from "react"

export default function BadgeLink(props: PropsWithChildren<LinkProps>) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center rounded-full border px-3.5 py-2 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground font-medium hover:bg-primary hover:text-primary-foreground"
    >
      {props.children}
    </Link>
  )
}
