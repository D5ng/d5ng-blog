import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <meta name="google-site-verification" content="7RRApm5ibN9lmrlZqPCOR3IgYupZLnsuQQTyrJAi6Xc" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
