import type { ReactNode } from "react"

// TODO(ds-0.2.0): 디자인 시스템 Chip(Solid, medium)으로 바꾸고 이 파일을 지워요.
export function Chip({
  pressed,
  count,
  onClick,
  children,
}: {
  pressed: boolean
  count: number
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="group inline-flex h-[36px] cursor-pointer items-center gap-4 rounded-full bg-bg-neutral-weak px-12 text-t4 font-medium text-fg-neutral transition-colors duration-[var(--d5ng-duration-normal)] ease-standard hover:bg-bg-neutral-weak-hover active:bg-bg-neutral-weak-pressed aria-pressed:bg-bg-neutral-solid aria-pressed:text-fg-on-neutral-solid aria-pressed:hover:bg-bg-neutral-solid-hover aria-pressed:active:bg-bg-neutral-solid-pressed"
    >
      {children}
      {/* 글자와 숫자가 붙어 "전체13"으로 읽히지 않게 스크린리더용 문구를 따로 둬요. */}
      <sup
        aria-hidden="true"
        className="static ml-2 align-baseline text-t3 font-medium text-fg-neutral-muted tabular-nums group-aria-pressed:text-current group-aria-pressed:opacity-70"
      >
        {count}
      </sup>
      <span className="sr-only"> {count}편</span>
    </button>
  )
}
