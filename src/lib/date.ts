// 2026-02-18 → 2026.02.18
export function formatDate(date: string) {
  return date.replaceAll("-", ".")
}
