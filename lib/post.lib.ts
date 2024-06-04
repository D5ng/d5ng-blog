/**
 * ! 포스트 파일 가져오기.
 */

import fs from "fs"
import matter from "gray-matter"
import readingTime from "reading-time"
import dayjs from "dayjs"
import { sync } from "glob"
import { BASE_PATH, POSTS_DIRECTORY } from "../config"
import { PostContents } from "./post.type"

export function getCategory() {
  const categoryPaths = sync(`${POSTS_DIRECTORY}/*`)
  const category = categoryPaths.map((path) => path.split("/").slice(-1)?.[0])
  return category
}

export function getPostPaths(category?: string) {
  const folder = category || "**"
  const postPaths = sync(`${POSTS_DIRECTORY}/${folder}/**/*.mdx`)
  return postPaths
}

export function getAllPosts(category?: string) {
  const postPaths = getPostPaths(category)
  const postList = postPaths.map((postPath) => parsePost(postPath))
  return postList
}

export function parsePost(postPath: string) {
  const abstractData = parsePostAbstract(postPath)
  const detailData = parsePostContents(postPath)

  return { ...abstractData, ...detailData }
}

export function parsePostAbstract(postPath: string) {
  const filePath = postPath.slice(postPath.indexOf(BASE_PATH)).replace(`${BASE_PATH}/`, "").replace(".mdx", "")
  const [categoryPath, slug] = filePath.split("/")
  const url = `blog/${categoryPath}/${slug}`
  const publicCategory = getPublicCategory(categoryPath)

  return { categoryPath, url, slug, publicCategory }
}

export function getPublicCategory(categoryPath: string) {
  return categoryPath
    .split("_")
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(" ")
}

export function parsePostContents(postPath: string) {
  const file = fs.readFileSync(postPath, "utf-8")
  const { data, content } = matter(file)
  const matterData = data as PostContents
  const readingMinutes = Math.ceil(readingTime(content).minutes)
  const dateCreated = `${dayjs(data.date).locale("ko").format("YYYY년 MM월 DD일")}`

  return {
    ...matterData,
    date: `${data.date}`,
    readingMinutes,
    dateCreated,
    content,
  }
}
