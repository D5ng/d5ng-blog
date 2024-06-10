import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getThemeMode(theme: "dark" | "light" | "system") {
  return theme === "dark" || theme === "system"
    ? {
        colors: {
          text: "#FAFAFA",
          background: "#0A0A0A",
          primary: "#FAFAFA",
          icon: "#FAFAFA",
        },
      }
    : {
        colors: {
          text: "#0A0A0A",
          background: "#fff",
          primary: "#171717",
          icon: "#171717",
        },
      }
}
