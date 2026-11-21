import type { Root } from "hast"
import { toString } from "hast-util-to-string"
import { visit } from "unist-util-visit"

export type TocItem = { id: string; text: string; depth: 2 | 3 }

/**
 * rehype-slug가 id를 붙인 뒤의 h2·h3에서 목차를 모아요.
 * 같은 id를 그대로 읽으므로 목차 링크와 제목 앵커가 어긋나지 않아요.
 * 코드 블록 안의 "## "는 제목이 아니라서 잡히지 않아요.
 */
export function rehypeToc(toc: TocItem[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return
      const id = node.properties.id
      if (typeof id !== "string") return
      toc.push({ id, text: toString(node).trim(), depth: node.tagName === "h2" ? 2 : 3 })
    })
  }
}
