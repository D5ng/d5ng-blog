import Link from "next/link"
import React from "react"
import { ModeToggle } from "../darkmode/darkmode"

export default function Header() {
  return (
    <header className="px-10 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">D5ng</Link>
      </h1>

      <ul className="flex gap-x-4">
        <li className="border rounded-full overflow-hidden">
          <ModeToggle />
        </li>
        <li className="px-4 py-1 rounded-full border w-fit flex justify-center items-center">
          <Link href="/">Github</Link>
        </li>
      </ul>
    </header>
  )
}
