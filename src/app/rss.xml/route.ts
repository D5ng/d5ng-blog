import { getAllPosts } from "@/lib/posts"
import { site } from "@/lib/site"

const escapes: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }

function escape(text: string) {
  return text.replace(/[&<>"']/g, (char) => escapes[char])
}

// 글 날짜에는 시각이 없어서 한국 시간 자정으로 봐요.
function rfc822(date: string) {
  return new Date(`${date}T00:00:00+09:00`).toUTCString()
}

export function GET() {
  const posts = getAllPosts()
  const items = posts.map((post) => {
    const url = `${site.url}/posts/${post.slug}`
    return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
    </item>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${site.url}</link>
    <description>${escape(site.description)}</description>
    <language>ko</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
