import { expect, test } from "@playwright/test"
import { legacyPosts } from "./legacy-posts"

const rows = "main ol > li"

test("JS가 꺼져 있어도 글 전체 목록이 보인다", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto("/?category=tech")
  await expect(page.locator(rows)).toHaveCount(legacyPosts.length)
  await context.close()
})

test("칩을 누르면 걸러지고 주소와 개수가 따라간다", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: /^기술/ }).click()
  await expect(page).toHaveURL(/\?category=tech$/)
  await expect(page.locator(rows)).toHaveCount(8)
  await expect(page.locator("main header span").first()).toHaveText("(8)")
  await expect(page.getByRole("button", { name: /^기술/ })).toHaveAttribute("aria-pressed", "true")

  await page.getByRole("button", { name: /^전체/ }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator(rows)).toHaveCount(legacyPosts.length)
})

test("칩 주소로 바로 들어오면 걸러져 있고, 모르는 값은 전체로 본다", async ({ page }) => {
  await page.goto("/?category=essay")
  await expect(page.locator(rows)).toHaveCount(5)
  await page.goto("/?category=foo")
  await expect(page.locator(rows)).toHaveCount(legacyPosts.length)
})

test("칩을 여러 번 눌러도 뒤로 가기 한 번에 이전 페이지로 나간다", async ({ page }) => {
  await page.goto("/posts/closure")
  await page.goto("/")
  for (const name of [/^기술/, /^생각/, /^기술/]) await page.getByRole("button", { name }).click()
  await page.goBack()
  await expect(page).toHaveURL(/\/posts\/closure$/)
})

test("키보드만으로 테마를 바꾸고, 칩을 고르고, 글을 연다", async ({ page }) => {
  await page.goto("/")
  const theme = () => page.evaluate(() => document.documentElement.getAttribute("data-theme"))
  const before = await theme()

  await page.getByRole("button", { name: /모드로 바꾸기$/ }).focus()
  await page.keyboard.press("Enter")
  expect(await theme()).not.toBe(before)

  await page.keyboard.press("Tab")
  await expect(page.getByRole("button", { name: /^전체/ })).toBeFocused()
  await page.keyboard.press("Tab")
  await page.keyboard.press("Space")
  await expect(page).toHaveURL(/\?category=tech$/)

  await page.keyboard.press("Tab")
  await page.keyboard.press("Tab")
  await expect(page.locator(`${rows} a`).first()).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(page).toHaveURL(/\/posts\/closure$/)
})

test("행은 링크라서 새 탭으로 열거나 주소를 복사할 수 있다", async ({ page }) => {
  await page.goto("/")
  const hrefs = await page.locator(`${rows} a`).evaluateAll((links) => links.map((link) => link.getAttribute("href")))
  expect(hrefs).toEqual(legacyPosts.map(() => expect.stringMatching(/^\/posts\/[a-z0-9-]+$/)))
})

test("360px 폭에서 가로 스크롤이 없다", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto("/")
  const { scrollWidth, clientWidth } = await page.evaluate(() => {
    const { scrollWidth, clientWidth } = document.documentElement
    return { scrollWidth, clientWidth }
  })
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
})
