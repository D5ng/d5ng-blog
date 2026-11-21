import { expect, test } from "@playwright/test"
import { legacyPosts } from "./legacy-posts"

const postPaths = legacyPosts.map(({ slug }) => `/posts/${slug}`).sort()

test("RSS에 글마다 제목·요약·주소·날짜가 있다", async ({ request }) => {
  const response = await request.get("/rss.xml")
  expect(response.headers()["content-type"]).toContain("application/rss+xml")

  const items = [...(await response.text()).matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1])
  const field = (item: string, name: string) => item.match(new RegExp(`<${name}>([^<]+)</${name}>`))?.[1] ?? ""

  expect(items.map((item) => new URL(field(item, "link")).pathname).sort()).toEqual(postPaths)
  for (const item of items) {
    expect(field(item, "title")).not.toBe("")
    expect(field(item, "description")).not.toBe("")
    expect(Number.isNaN(Date.parse(field(item, "pubDate")))).toBe(false)
  }
})

test("sitemap에 메인과 글이 모두 있고, robots.txt가 sitemap을 알려 준다", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text()
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname)
  expect(paths.sort()).toEqual(["/", ...postPaths].sort())

  const robots = await (await request.get("/robots.txt")).text()
  expect(robots).toMatch(/^Sitemap: https?:\/\/.+\/sitemap\.xml$/m)
})
