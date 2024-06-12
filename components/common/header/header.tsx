import Link from "next/link"
import React from "react"
import { ModeToggle } from "../../darkmode/darkmode"
import { ArrowUpRight } from "lucide-react"

export default function Header() {
  return (
    <header className="px-5 sm:px-10 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">D5ng</Link>
      </h1>

      <ul className="flex gap-x-2 sm:gap-x-4">
        <li className="border rounded-full overflow-hidden">
          <ModeToggle />
        </li>
        <li className="px-5 py-1.5 rounded-full border w-fit flex justify-center items-center hover:bg-primary hover:text-primary-foreground transition-colors">
          <Link href="https://github.com/D5ng" target="_blank" className="flex items-center gap-x-1">
            Github
            <ArrowUpRight width="16" height="16" />
          </Link>
        </li>
      </ul>
    </header>
  )
}
