import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D5ng",
  description: "프론트엔드 개발자 D5ng이 배우고, 만들고, 고민한 것을 적는 블로그",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
