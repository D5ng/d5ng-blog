import { Link } from "@d5ng/react"
import Image from "next/image"
import NextLink from "next/link"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"

type MDXComponents = NonNullable<MDXRemoteProps["components"]>

// 상단 바(56px)와 진행 선 아래로 제목이 숨지 않게 주소의 #제목으로 올 때 그만큼 띄워요.
const heading = "scroll-mt-[72px]"

// 목록 안 목록은 위아래 간격 없이 붙어요.
const list = "mb-[22px] [li>&]:mt-[4px] [li>&]:mb-0"

export const mdxComponents: MDXComponents = {
  p: (props) => <p className="mb-[22px]" {...props} />,
  h2: (props) => (
    <h2 className={`${heading} mt-[56px] mb-[14px] text-t10 font-medium narrow:mt-[48px] narrow:text-t8`} {...props} />
  ),
  h3: (props) => <h3 className={`${heading} mt-[40px] mb-[10px] text-t7 font-semibold narrow:text-t6`} {...props} />,
  h4: (props) => <h4 className={`${heading} mt-[32px] mb-[8px] text-t6 font-semibold narrow:text-t5`} {...props} />,
  ul: (props) => <ul className={`${list} list-disc pl-[1.2em]`} {...props} />,
  ol: (props) => <ol className={`${list} list-decimal pl-[1.4em]`} {...props} />,
  li: (props) => <li className="my-[4px]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mb-[22px] border-l-2 border-stroke-neutral-strong pl-[18px] text-fg-neutral-muted [&>p:last-child]:mb-0"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
  hr: () => <hr className="my-[48px] border-stroke-neutral-muted" />,
  pre: (props) => (
    <pre
      className="mb-[22px] overflow-x-auto rounded-md bg-bg-code px-20 py-[18px] font-mono text-code text-fg-code"
      {...props}
    />
  ),
  code: (props) => {
    // 코드 블록의 code는 rehype-pretty-code가 data-language를 붙여요. 없으면 문장 속 코드예요.
    if ("data-language" in props) return <code {...props} />
    return (
      <code className="rounded-sm bg-bg-code px-[0.3em] py-[0.1em] font-mono text-[0.875em] text-fg-code" {...props} />
    )
  },
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
    return <Image src={src} alt={alt} width={Number(width)} height={Number(height)} className="h-auto max-w-full" />
  },
}
