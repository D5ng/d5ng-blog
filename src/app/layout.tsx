import type { Metadata } from "next"
import { ThemeScript } from "@/components/theme-script"
import { site } from "@/lib/site"
import "@/fonts/pretendard/pretendardvariable.css"
import "@/fonts/jetbrains-mono/jetbrains-mono.css"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  )
}
