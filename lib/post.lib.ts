/**
 * ! 포스트 파일 가져오기.
 */

import { sync } from "glob"
import { POSTS_DIRECTORY } from "../config"

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
