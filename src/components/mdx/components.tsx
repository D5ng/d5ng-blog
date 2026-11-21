import { Link } from "@d5ng/react"
import Image from "next/image"
import NextLink from "next/link"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"

type MDXComponents = NonNullable<MDXRemoteProps["components"]>

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link asChild>
          <NextLink href={href} {...props}>
            {children}
          </NextLink>
        </Link>
      )
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  },
  img: ({ src, alt = "", width, height }) => {
    if (typeof src !== "string" || !width || !height) throw new Error(`본문 이미지 크기를 알 수 없어요: ${String(src)}`)
    return <Image src={src} alt={alt} width={Number(width)} height={Number(height)} />
  },
}
