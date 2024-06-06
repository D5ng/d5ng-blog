import Link from "next/link"
import React from "react"
import { ModeToggle } from "../darkmode/darkmode"

export default function Header() {
  return (
    <header className="px-5 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">D5ng</Link>
      </h1>

      <ul className="flex gap-x-2">
        <li>
          <ModeToggle />
        </li>
        <li className="px-4 py-1 rounded-full border w-fit flex justify-center items-center">
          <Link href="/">Github</Link>
        </li>
      </ul>
    </header>
  )
}

/**
 * ! Header
 * ! 로고,
 * ! 다크모드, github
 * !
 */
