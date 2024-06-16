import Header from "@/components/common/header/header"
import { ThemeProvider } from "@/components/theme/theme-provider"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"

import "@/styles/globals.css"
import Footer from "@/components/common/footer/footer"
import SmoothProvider from "@/components/smooth"

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
      <SmoothProvider>
        <Header />
        <main className="mt-[50px]">
          <Component {...pageProps} />
        </main>
        <Footer />
      </SmoothProvider>
    </ThemeProvider>
  )
}
