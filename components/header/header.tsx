import Link from "next/link"
import React from "react"

export default function Header() {
  return (
    <header className="px-5 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">D5ng</Link>
      </h1>

      <ul className="flex gap-x-2">
        <li className="px-3 py-1 rounded-full border border-neutral-900 w-fit">
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
