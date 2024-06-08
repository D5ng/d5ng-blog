import Header from "@/components/header/header"
import { ThemeProvider } from "@/components/theme/theme-provider"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"

import "@/styles/globals.css"

const poppins = Poppins({
  weight: ["400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <>
        <style jsx global>{`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}</style>
      </>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
