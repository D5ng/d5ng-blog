import React, { useEffect, useState } from "react"
import { ClapButton, LikeButton, Provider } from "@lyket/react"
import { Post } from "@/lib/post.type"
import { useTheme } from "next-themes"
import { getThemeMode } from "@/utils/theme.utils"

export default function PostDetailReaction(props: Pick<Post, "slug">) {
  const [isMount, setIsMount] = useState(false)
  const { resolvedTheme } = useTheme()
  const themeMode = getThemeMode(resolvedTheme as "dark" | "light" | "system")

  useEffect(() => {
    setIsMount(true)
  }, [])

  if (!isMount) return null

  return (
    <Provider apiKey={process.env.NEXT_PUBLIC_REACTION_API!} theme={themeMode}>
      <div className="flex items-center gap-x-2 border-t border-b border-neutral-200 px-2 py-1 dark:border-neutral-700">
        <ClapButton
          namespace={`post-${props.slug}-clap`}
          id="everybody-clap-now"
          component={ClapButton.templates.Medium}
        />
        <LikeButton
          namespace={`post-${props.slug}-like`}
          id="everybody-like-now"
          component={LikeButton.templates.Twitter}
        />
      </div>
    </Provider>
  )
}
