import path from "node:path"
import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import { cacheLife } from "next/cache"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import { mdxComponents } from "@/components/mdx/components"
import { rehypeImageSize } from "./rehype-image-size"
import { rehypeToc, type TocItem } from "./rehype-toc"

// 글 본문이 인자라서 본문을 고치면 캐시도 새로 만들어져요.
export async function compilePost(source: string, file: string) {
  "use cache"
  cacheLife("max")

  const toc: TocItem[] = []
  try {
    const { content } = await compileMDX({
      source,
      components: mdxComponents,
      options: {
        mdxOptions: {
          // 예전 글은 줄바꿈 한 번을 줄로 썼어요. remark-breaks가 없으면 회고 글 문단이 한 덩어리로 붙어요.
          remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkBreaks],
          rehypePlugins: [
            rehypeSlug,
            rehypeToc(toc),
            // 라이트·다크 색을 CSS 변수로 함께 내보내고, data-theme에 따라 CSS가 고르게 해요.
            [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false }],
            rehypeImageSize,
          ],
        },
      },
    })
    return { content, toc }
  } catch (error) {
    throw new Error(`글을 컴파일하지 못했어요: ${path.relative(process.cwd(), file)}`, { cause: error })
  }
}
