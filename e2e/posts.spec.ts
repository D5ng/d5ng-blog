import { expect, test } from "@playwright/test"
import { legacyPosts } from "./legacy-posts"

for (const { slug } of legacyPosts) {
  test(`${slug}: 제목(h2·h3)마다 겹치지 않는 id가 있어 주소로 바로 갈 수 있다`, async ({ request }) => {
    const html = await (await request.get(`/posts/${slug}`)).text()
    const headings = [...html.matchAll(/<h([23])([^>]*)>/g)].map((match) => match[2].match(/ id="([^"]+)"/)?.[1])

    expect(headings.length).toBeGreaterThan(0)
    expect(headings.filter((id) => !id)).toEqual([])
    expect(new Set(headings).size).toBe(headings.length)
  })

  test(`${slug}: 360px에서 가로 스크롤이 없고 본문 이미지가 다 열린다`, async ({ page, request }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto(`/posts/${slug}`)
    const { scroll, client } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }))
    expect(scroll).toBeLessThanOrEqual(client)

    const sources = await page
      .locator("article img")
      .evaluateAll((images) => images.map((image) => image.getAttribute("src") ?? ""))
    expect(sources.length).toBeGreaterThan(0)
    for (const src of sources) expect((await request.get(src)).status(), src).toBe(200)
  })
}

test("없는 글 주소는 404이고 메인으로 가는 링크가 있다", async ({ page }) => {
  const response = await page.goto("/posts/no-such-post")
  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("없는 글이에요")
  await expect(page.getByRole("link", { name: "메인으로" })).toHaveAttribute("href", "/")
})
