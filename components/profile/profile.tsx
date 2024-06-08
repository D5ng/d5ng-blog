import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import profileImage from "@/public/profile.png"

export default function Profile() {
  return (
    <Avatar className="not-prose ring-2 ring-inset ring-neutral-300">
      <AvatarImage src="/profile.png" alt="DongHyun Lee" />
      <AvatarFallback>DH</AvatarFallback>
    </Avatar>
  )
}
