import Header from "@/components/header/header"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Header />
      <Component {...pageProps} />;
    </ThemeProvider>
  )
}
