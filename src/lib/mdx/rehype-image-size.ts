import fs from "node:fs"
import path from "node:path"
import type { Root } from "hast"
import { imageSize } from "image-size"
import { visit } from "unist-util-visit"

const PUBLIC_DIR = path.join(process.cwd(), "public")

/**
 * 본문 이미지에 실제 width·height를 넣어요. 이미지가 늦게 와도 본문이 밀리지 않아요.
 * 사이트 안 이미지 파일이 없으면 빌드를 멈춰서 깨진 경로를 바로 알 수 있어요.
 */
export function rehypeImageSize() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") return
      const src = node.properties.src
      if (typeof src !== "string" || !src.startsWith("/")) return
      const file = path.join(PUBLIC_DIR, decodeURI(src))
      if (!fs.existsSync(file)) throw new Error(`본문 이미지가 없어요: public${src}`)
      const { width, height } = imageSize(fs.readFileSync(file))
      node.properties.width = width
      node.properties.height = height
    })
  }
}
