import fs from "node:fs"
import path from "node:path"
import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"
import { getAllPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export const alt = `${site.name} 블로그 글`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

// 공유 미리보기 그림은 satori로 그려요. satori는 woff2를 못 읽어서 OTF를 빌드 때만 읽어요.
// BLOG 글자에 쓰는 ExtraBold는 B·L·O·G 네 글자만 남겨 둔 파일이에요.
const FONT_DIR = path.join(process.cwd(), "src/fonts/pretendard/otf")

// 디자인 시스템 라이트 색이에요(gray-0, gray-900). satori는 CSS 변수를 읽지 못해요.
const BACKGROUND = "#ffffff"
const INK = "#191f28"

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getAllPosts().find((item) => item.slug === slug)
  if (!post) notFound()

  // 비동기로 읽으면(fs/promises) cacheComponents가 요청 때 그리는 그림으로 봐서 빌드 때 미리 만들지 않아요.
  const bold = fs.readFileSync(path.join(FONT_DIR, "Pretendard-Bold.otf"))
  const extraBold = fs.readFileSync(path.join(FONT_DIR, "Pretendard-ExtraBold-BLOG.otf"))

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: BACKGROUND,
        color: INK,
        fontFamily: "Pretendard",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          wordBreak: "keep-all",
        }}
      >
        {post.title}
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          fontSize: 240,
          fontWeight: 800,
          lineHeight: 0.78,
          letterSpacing: "-0.055em",
        }}
      >
        BLOG
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  )
}
