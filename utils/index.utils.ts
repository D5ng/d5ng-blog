export const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

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
