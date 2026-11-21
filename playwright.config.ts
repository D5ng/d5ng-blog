import { defineConfig } from "@playwright/test"

const port = 3000

// 프로덕션 빌드를 확인해요. 먼저 pnpm build를 실행해 두세요.
export default defineConfig({
  testDir: "e2e",
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `pnpm start --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
})
