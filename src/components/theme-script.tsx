import { themeInitScript } from "@/lib/theme"

// 다크 모드를 쓰는 사람이 새로고침할 때 흰 화면이 번쩍이지 않게 해요.
// 스크립트가 <html>에 data-theme을 넣으므로 <html>에는 suppressHydrationWarning이 필요해요.
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
}
