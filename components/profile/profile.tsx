import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import profileImage from "@/public/profile.png"

export default function Profile() {
  return (
    <Avatar className="not-prose bg-neutral-200 ring-2 ring-white">
      <AvatarImage src="/profile.png" alt="DongHyun Lee" />
      <AvatarFallback>DH</AvatarFallback>
    </Avatar>
  )
}
