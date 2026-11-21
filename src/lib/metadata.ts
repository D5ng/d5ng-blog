import type { Metadata } from "next"
import { site } from "./site"

/*
 * 페이지가 openGraph나 alternates를 정하면 레이아웃 값과 합쳐지지 않고 통째로 바뀌어요.
 * 그래서 페이지마다 공통 값을 함께 넣어요.
 */
export const feedLinks = { "application/rss+xml": [{ url: "/rss.xml", title: site.name }] }

export const baseOpenGraph = {
  siteName: site.name,
  locale: "ko_KR",
} satisfies Metadata["openGraph"]
