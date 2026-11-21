import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import matter from "gray-matter"
import { z } from "zod"
import { compilePost } from "./mdx/compile"
import { postFrontmatter, type Category, type ThumbnailFocus } from "./post-schema"

const POSTS_DIR = path.join(process.cwd(), "content/posts")
const PUBLIC_DIR = path.join(process.cwd(), "public")

// 한국어는 분당 약 500자를 읽어요.
const CHARS_PER_MINUTE = 500

export type PostMeta = {
  slug: string
  title: string
  date: string
  category: Category
  description: string
  thumbnail: string
  thumbnailFocus: ThumbnailFocus
  readingMinutes: number
}

type PostSource = { meta: PostMeta; file: string; body: string }

function readingMinutes(body: string) {
  const text = body
    .replace(/^```[\s\S]*?^```/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<[^>]+>/g, "")
  return Math.max(1, Math.ceil(text.replace(/\s/g, "").length / CHARS_PER_MINUTE))
}

const warned = new Set<string>()

function thumbnailOf(slug: string, category: Category) {
  const src = `/posts/${slug}/thumbnail.jpg`
  if (fs.existsSync(path.join(PUBLIC_DIR, src))) return src
  if (!warned.has(slug)) {
    warned.add(slug)
    console.warn(`[posts] ${slug}: public${src}가 없어서 임시 이미지를 써요`)
  }
  return `/placeholders/${category}.jpg`
}

function readPost(slug: string): PostSource | null {
  const file = path.join(POSTS_DIR, slug, "index.mdx")
  const { data, content } = matter(fs.readFileSync(file, "utf8"))
  const parsed = postFrontmatter.safeParse(data)
  if (!parsed.success) {
    throw new Error(
      `글 frontmatter가 잘못됐어요: ${path.relative(process.cwd(), file)}\n${z.prettifyError(parsed.error)}`,
    )
  }
  const { draft, ...frontmatter } = parsed.data
  if (draft && process.env.NODE_ENV === "production") return null
  return {
    meta: {
      ...frontmatter,
      slug,
      thumbnail: thumbnailOf(slug, frontmatter.category),
      readingMinutes: readingMinutes(content),
    },
    file,
    body: content,
  }
}

const getSources = cache((): PostSource[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readPost(entry.name))
    .filter((post) => post !== null)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
})

export const getAllPosts = cache((): PostMeta[] => getSources().map((post) => post.meta))

export const getPost = cache(async (slug: string) => {
  const source = getSources().find((post) => post.meta.slug === slug)
  if (!source) return null
  const { content, toc } = await compilePost(source.body, source.file)
  return { meta: source.meta, content, toc }
})
