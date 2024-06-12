import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"
import React from "react"

export default function PostDetailBody(props: MDXRemoteProps) {
  return <MDXRemote {...props} />
}
