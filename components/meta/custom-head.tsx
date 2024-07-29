import Head from "next/head"
import React from "react"

interface Props {
  title?: string
  description?: string
  tag?: string
  slug?: string[]
  image?: string
}

export default function CustomHead(props: Props) {
  const title = props.title ? `d5ng-Blog - ${props.title}` : "d5ng-Blog - FrontEnd"
  const path = props.slug ? props.slug.join("/") : ""
  const pageURL = `${process.env.NEXT_PUBLIC_HOST_URL}${path}`
  const description = props.description || "UI/UX와 클린코드에 관심 많은 Frontend 이동현 입니다."
  const image = props.image
    ? `${process.env.NEXT_PUBLIC_HOST_URL}${props.image}`
    : process.env.NEXT_PUBLIC_PROFILE_IMAGE

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={pageURL} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="D5ng Blog" />
      <meta property="og:type" content="website" />
      <meta property="article:author" content="D5ng" />
      <meta property="article:tag" content={`프론트엔드 기술블로그 ${props.tag || ""}`} />
      <link rel="icon" href="/favicon32.png" type="image/png" />
    </Head>
  )
}
