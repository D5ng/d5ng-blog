import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: site.url, lastModified: posts[0]?.date },
    ...posts.map((post) => ({ url: `${site.url}/posts/${post.slug}`, lastModified: post.date })),
  ]
}
