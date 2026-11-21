import { Suspense } from "react"
import type { CategoryCounts } from "@/lib/category"
import { formatDate } from "@/lib/date"
import { site } from "@/lib/site"
import styles from "./hero.module.css"
import { PostCount } from "./post-count"

export function Hero({ counts }: { counts: CategoryCounts }) {
  return (
    <header className={`wrap ${styles.head}`}>
      <div className={styles.grid}>
        <span className={styles.count}>
          <Suspense fallback={`(${counts.all})`}>
            <PostCount counts={counts} />
          </Suspense>
        </span>
        <p className={styles.intro}>
          {site.intro.text}
          <time dateTime={site.intro.date} className={styles.at}>
            {formatDate(site.intro.date)}
          </time>
        </p>
        <div className={styles.wordBox}>
          <h1 className={styles.word}>BLOG</h1>
        </div>
      </div>
    </header>
  )
}
