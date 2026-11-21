import { expect, test, type Page } from "@playwright/test"

const slug = "closure"
const title = "구조적 측면으로 클로저 이해하기"

// 메인 목록의 순서(최신순)예요. 이전 글·다음 글은 이 순서를 따라요.
async function listOrder(page: Page) {
  await page.goto("/")
  return page.locator("main ol > li > a").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""))
}

function rgb(hex: string) {
  const [r, g, b] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16))
  return `rgb(${r}, ${g}, ${b})`
}

test("주소로 바로 들어와도 글 머리와 본문이 다 나온다", async ({ page }) => {
  await page.goto(`/posts/${slug}`)
  await expect(page).toHaveTitle(`${title} · D5ng`)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(title)
  await expect(page.locator("article header p")).toHaveText(/^약 \d+분 · 2025\.01\.05 · 기술$/)
  await expect(page.locator("article header img")).toBeVisible()
  await expect(page.locator("article h2").first()).toBeVisible()
})

test("목록 버튼은 메인으로 간다", async ({ page }) => {
  await page.goto(`/posts/${slug}`)
  await page.getByRole("link", { name: "목록", exact: true }).click()
  await expect(page).toHaveURL("/")
})

test("공유 미리보기에 쓰는 메타와 그림이 있다", async ({ page, request }) => {
  await page.goto(`/posts/${slug}`)
  const meta = (property: string) => page.locator(`meta[property="${property}"]`).getAttribute("content")

  expect(await meta("og:title")).toBe(title)
  expect(await meta("og:type")).toBe("article")
  expect(await meta("article:published_time")).toBe("2025-01-05")
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(new RegExp(`/posts/${slug}$`))
  expect(await page.locator('meta[name="twitter:card"]').getAttribute("content")).toBe("summary_large_image")

  // og:image는 배포 주소라서 경로만 떼어 이 서버에 물어봐요.
  const image = new URL((await meta("og:image")) ?? "")
  const response = await request.get(image.pathname + image.search)
  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toBe("image/png")
})

test("다크 모드로 바꾸면 코드 블록 글자색이 다크 테마 값으로 바뀐다", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto(`/posts/${slug}`)
  const token = page.locator("[data-rehype-pretty-code-figure] [data-line] span[style]").first()
  const light = await token.evaluate((element) => element.style.getPropertyValue("--shiki-light"))
  const dark = await token.evaluate((element) => element.style.getPropertyValue("--shiki-dark"))
  expect(light).not.toBe(dark)

  await expect(token).toHaveCSS("color", rgb(light))
  await page.getByRole("button", { name: "다크 모드로 바꾸기" }).click()
  await expect(token).toHaveCSS("color", rgb(dark))
})

test("이전 글·다음 글은 메인 목록 순서를 따르고 새 글이 위에 있다", async ({ page }) => {
  const order = await listOrder(page)
  const neighbors = page.getByRole("navigation", { name: "이전 글과 다음 글" }).getByRole("link")
  const at = order.indexOf(`/posts/${slug}`)

  await page.goto(order[at])
  await expect(neighbors).toHaveCount(2)
  await expect(neighbors.nth(0)).toHaveAttribute("href", order[at - 1])
  await expect(neighbors.nth(0)).toContainText("다음 글")
  await expect(neighbors.nth(1)).toHaveAttribute("href", order[at + 1])
  await expect(neighbors.nth(1)).toContainText("이전 글")

  await neighbors.nth(1).click()
  await expect(page).toHaveURL(order[at + 1])
})

test("가장 새 글에는 이전 글만, 가장 오래된 글에는 다음 글만 있다", async ({ page }) => {
  const order = await listOrder(page)
  const neighbors = page.getByRole("navigation", { name: "이전 글과 다음 글" }).getByRole("link")

  await page.goto(order[0])
  await expect(neighbors).toHaveCount(1)
  await expect(neighbors).toContainText("이전 글")

  await page.goto(order[order.length - 1])
  await expect(neighbors).toHaveCount(1)
  await expect(neighbors).toContainText("다음 글")
})

test("제목을 지나 스크롤하면 바에 제목이 나오고, 끝까지 내리면 진행 선이 다 찬다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`/posts/${slug}`)
  const bar = page.locator("body > header")
  const barTitle = bar.locator(':scope > div > span[aria-hidden="true"]')
  const progress = bar.locator(':scope > div[aria-hidden="true"] > span')

  await expect(barTitle).toHaveText(title)
  await expect(barTitle).toHaveCSS("opacity", "0")
  await expect(progress).toHaveCSS("transform", "matrix(0, 0, 0, 1, 0, 0)")

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect(barTitle).toHaveCSS("opacity", "1")
  await expect(progress).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)")
})

test("주소의 #제목으로 들어오면 그 제목이 상단 바에 가리지 않는다", async ({ page }) => {
  await page.goto(`/posts/${slug}`)
  const id = (await page.locator("article h2[id]").nth(1).getAttribute("id")) ?? ""
  await page.goto(`/posts/${slug}#${encodeURIComponent(id)}`)

  const heading = page.locator(`[id="${id}"]`)
  await expect(heading).toBeInViewport()
  const top = await heading.evaluate((element) => element.getBoundingClientRect().top)
  const barBottom = await page.locator("body > header").evaluate((element) => element.getBoundingClientRect().bottom)
  expect(top).toBeGreaterThanOrEqual(barBottom)
})
