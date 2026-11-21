import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  // 켜면 목록에 없는 글 주소가 주소와 상관없는 틀을 먼저 200으로 보내서 404가 나가지 않아요.
  // 글이 적어서 링크마다 미리 받아도 부담이 작아요. 옵션을 지우면 빌드마다 경고가 떠서 false로 적어 둬요.
  partialPrefetching: false,
  // 글 페이지를 서버에서 다시 만들 때(캐시 만료, 목록에 없는 주소) 글 원문과 본문 이미지 크기가 필요해요.
  outputFileTracingIncludes: {
    "/posts/*": ["./content/posts/**/*", "./public/posts/**/*"],
  },
  // 예전 블로그 주소는 /{폴더}/{slug}였어요. slug는 그대로라 글 주소만 바꿔요.
  redirects: async () => [
    // 「갤러리 형태의 고급진 블로그」 글은 옮기지 않았어요.
    { source: "/Introduce/:slug?", destination: "/", permanent: true },
    { source: "/:folder(JavaScript|React|Retrospective)/:slug", destination: "/posts/:slug", permanent: true },
    { source: "/:folder(JavaScript|React)", destination: "/?category=tech", permanent: true },
    { source: "/Retrospective", destination: "/?category=essay", permanent: true },
    { source: "/posts", destination: "/", permanent: true },
  ],
}

export default nextConfig
