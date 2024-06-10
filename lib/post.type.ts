export interface PostContents {
  title: string
  date: string
  description: string
  thumbnail: string
  author: string
  profileImage: string
}

export interface Post extends PostContents {
  readingMinutes: number
  dateCreated: string
  content: string
  categoryPath: string
  url: string
  slug: string
  publicCategory: string
}
