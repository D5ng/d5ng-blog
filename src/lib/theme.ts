export type Theme = "light" | "dark"

// 시안과 같은 키예요.
export const THEME_STORAGE_KEY = "d5ng-theme"

/**
 * <head>에서 첫 화면을 그리기 전에 실행되는 스크립트예요.
 * 저장한 값이 light나 dark면 그 값을, 아니면 시스템 설정을 <html data-theme>에 넣어요.
 */
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)})()`

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // 저장소를 못 쓰는 브라우저(사생활 보호 모드 등)에서도 지금 화면의 테마는 바뀌어요.
  }
}
