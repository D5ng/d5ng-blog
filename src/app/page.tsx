import { site } from "@/lib/site"
import { TempThemeButton } from "./temp-theme-button"

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-24 px-24 py-64">
      <div className="flex flex-col gap-8">
        <h1 className="text-t14 font-bold">BLOG</h1>
        <p className="text-t5 text-fg-neutral-muted">
          {site.intro.text}{" "}
          <time dateTime={site.intro.date} className="text-fg-neutral-subtle">
            {site.intro.date.replaceAll("-", ".")}
          </time>
        </p>
      </div>
      <p className="max-w-2xl text-t5 text-fg-neutral">
        새 블로그를 만드는 중이에요. 예전 블로그에 쓴 글은 그대로 옮기고, 글을 읽는 화면과 고르는 화면을 새로 그려요. 이
        문단은 글꼴이 얼마나 내려받아지는지 재려고 넣었어요. 한글은 글자 수가 많아서 글꼴을 조각으로 나누고, 화면에 나온
        글자가 든 조각만 받아요.
      </p>
      <p className="text-t5 text-fg-neutral-subtle">
        코드 글꼴은 <code className="font-mono text-code text-fg-code">JetBrains Mono</code>예요.
      </p>
      <div>
        <TempThemeButton />
      </div>
    </main>
  )
}
