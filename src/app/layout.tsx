import type { Metadata } from "next"
import { ThemeScript } from "@/components/theme-script"
import { baseOpenGraph, feedLinks } from "@/lib/metadata"
import { site } from "@/lib/site"
import "@/fonts/pretendard/pretendardvariable.css"
import "@/fonts/jetbrains-mono/jetbrains-mono.css"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { types: feedLinks },
  openGraph: { ...baseOpenGraph, type: "website", title: site.name, description: site.description },
  twitter: { card: "summary_large_image" },
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
