import { expect, test } from "@playwright/test"
import { legacyPosts } from "./legacy-posts"

for (const { slug } of legacyPosts) {
  test(`${slug}: 목차 링크마다 같은 id의 제목이 있다`, async ({ request }) => {
    const html = await (await request.get(`/posts/${slug}`)).text()
    const toc = html.match(/<nav aria-label="목차">([\s\S]*?)<\/nav>/)?.[1] ?? ""
    const targets = [...toc.matchAll(/href="#([^"]+)"/g)].map((match) => match[1])
    const ids = new Set([...html.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]))

    expect(targets.length).toBeGreaterThan(0)
    expect(targets.filter((id) => !ids.has(id))).toEqual([])
  })
}

test("없는 글 주소는 404", async ({ request }) => {
  const response = await request.get("/posts/no-such-post")
  expect(response.status()).toBe(404)
})
