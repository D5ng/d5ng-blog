export interface PostContents {
  title: string
  date: string
  description: string
  thumbnail: string
}

export interface Post {
  date: string
  readingMinutes: number
  dateCreated: string
  content: string
  title: string
  description: string
  thumbnail: string
  categoryPath: string
  url: string
  slug: string
  publicCategory: string
}
