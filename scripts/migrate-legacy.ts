// 예전 레포(D5ng/d5ng-blog-legacy)의 글 13편과 이미지를 새 구조로 한 번 옮기는 스크립트예요.
// 실행: node scripts/migrate-legacy.ts <예전 레포 경로>
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import sharp from "sharp"

type Category = "tech" | "essay"
type Focus = "center" | "left" | "right" | "top" | "bottom"

const legacyRoot = process.argv[2]
if (!legacyRoot) throw new Error("예전 레포 경로를 넘겨 주세요")

const CATEGORY_BY_FOLDER: Record<string, Category> = { JavaScript: "tech", React: "tech", Retrospective: "essay" }

// 썸네일이 작은 로고라 새로 만들기로 한 글이에요. 그때까지는 분류별 임시 이미지를 써요.
const SKIP_THUMBNAIL = new Set(["geultto", "codeit-end"])
const FOCUS: Record<string, Focus> = { "compound-pattern": "left" }
const MAX_EDGE = 1600

const outContent = path.resolve("content/posts")
const outPublic = path.resolve("public/posts")

function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  throw new Error(`날짜 형식이 달라요: ${String(value)}`)
}

async function writeImage(src: string, dest: string, asThumbnail: boolean) {
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  const ext = path.extname(src).toLowerCase()
  const meta = await sharp(src).metadata()
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0)
  if (asThumbnail) {
    await sharp(src)
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dest)
    return
  }
  if (ext === ".gif" || longEdge <= MAX_EDGE) {
    fs.copyFileSync(src, dest)
    return
  }
  const resized = sharp(src).resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside" })
  if (ext === ".png") await resized.png({ compressionLevel: 9 }).toFile(dest)
  else await resized.jpeg({ quality: 82, mozjpeg: true }).toFile(dest)
}

async function migratePost(folder: string, slug: string) {
  const category = CATEGORY_BY_FOLDER[folder]
  const file = path.join(legacyRoot, "_posts", folder, slug, "content.mdx")
  const { data, content } = matter(fs.readFileSync(file, "utf8"))

  // 예전 이미지 경로는 /posts/{JavaScript|react|retrospective}/{slug}/{파일}이에요.
  const legacyImageDir = path.posix.dirname(String(data.thumbnail))
  const body = content.replaceAll(`${legacyImageDir}/`, `/posts/${slug}/`)
  if (/\/posts\/(JavaScript|react|retrospective|introduce)\//.test(body)) {
    throw new Error(`${slug}: 바꾸지 못한 예전 이미지 경로가 남았어요`)
  }

  const frontmatter = [
    `title: ${JSON.stringify(data.title)}`,
    `date: ${formatDate(data.date)}`,
    `category: ${category}`,
    `description: ${JSON.stringify(data.description)}`,
    `thumbnailFocus: ${FOCUS[slug] ?? "center"}`,
  ].join("\n")
  fs.mkdirSync(path.join(outContent, slug), { recursive: true })
  fs.writeFileSync(
    path.join(outContent, slug, "index.mdx"),
    `---\n${frontmatter}\n---\n${content.startsWith("\n") ? "" : "\n"}${body}`,
  )

  const legacyPublic = path.join(legacyRoot, "public", legacyImageDir)
  if (!SKIP_THUMBNAIL.has(slug)) {
    await writeImage(
      path.join(legacyRoot, "public", String(data.thumbnail)),
      path.join(outPublic, slug, "thumbnail.jpg"),
      true,
    )
  }
  const used = [...body.matchAll(new RegExp(`/posts/${slug}/([^)\\s"']+)`, "g"))].map((m) => m[1])
  for (const name of new Set(used)) {
    await writeImage(path.join(legacyPublic, name), path.join(outPublic, slug, name), false)
  }
  console.log(
    `${slug}: ${category}, 본문 이미지 ${new Set(used).size}개${SKIP_THUMBNAIL.has(slug) ? ", 썸네일 없음" : ""}`,
  )
}

async function writePlaceholders() {
  const colors: Record<Category, string> = { tech: "#4e5968", essay: "#d1d6db" }
  const dir = path.resolve("public/placeholders")
  fs.mkdirSync(dir, { recursive: true })
  for (const [category, color] of Object.entries(colors)) {
    await sharp({ create: { width: 1600, height: 1000, channels: 3, background: color } })
      .jpeg({ quality: 82 })
      .toFile(path.join(dir, `${category}.jpg`))
  }
}

for (const folder of Object.keys(CATEGORY_BY_FOLDER)) {
  for (const slug of fs.readdirSync(path.join(legacyRoot, "_posts", folder)).sort()) {
    await migratePost(folder, slug)
  }
}
await writePlaceholders()
