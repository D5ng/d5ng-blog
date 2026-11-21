import { expect, test } from "@playwright/test"
import { legacyPosts } from "./legacy-posts"

const redirects = [
  ...legacyPosts.map(({ folder, slug }) => [`/${folder}/${slug}`, `/posts/${slug}`]),
  ["/Introduce/self", "/"],
  ["/Introduce", "/"],
  ["/JavaScript", "/?category=tech"],
  ["/React", "/?category=tech"],
  ["/Retrospective", "/?category=essay"],
  ["/posts", "/"],
]

for (const [from, to] of redirects) {
  test(`${from} → ${to}`, async ({ request }) => {
    const redirect = await request.get(from, { maxRedirects: 0 })
    expect(redirect.status()).toBe(308)
    expect(redirect.headers().location).toBe(to)

    const destination = await request.get(to)
    expect(destination.status()).toBe(200)
  })
}
