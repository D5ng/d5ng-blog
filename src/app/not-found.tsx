import { Link } from "@d5ng/react"
import type { Metadata } from "next"
import NextLink from "next/link"

export const metadata: Metadata = { title: "없는 글이에요" }

export default function NotFound() {
  return (
    <main id="main" className="wrap pt-[clamp(72px,12vw,160px)] pb-[clamp(72px,9vw,140px)]">
      <h1 className="text-t12 font-medium">없는 글이에요</h1>
      <p className="mt-16 text-t6">
        <Link asChild>
          <NextLink href="/">메인으로</NextLink>
        </Link>
      </p>
    </main>
  )
}
