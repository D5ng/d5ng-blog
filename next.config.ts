import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // partialPrefetching은 켜지 않아요. 켜면 목록에 없는 글 주소가 빈 틀을 먼저 200으로 보내서 404가 나가지 않아요.
  // 글은 모두 빌드 때 만들어 두므로 부분 프리페치로 얻는 것도 없어요.
  cacheComponents: true,
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
