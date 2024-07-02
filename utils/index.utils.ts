import dayjs from "dayjs"

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

export function formatDate(date: string) {
  const transformedMonth = MONTHS_EN[dayjs(date).month()]
  const transformedDate = dayjs(date).date()
  const transformedyear = dayjs(date).year()

  return `${transformedMonth} ${transformedDate}, ${transformedyear}`
}

type TransformedCategory = { [key: string]: string }

export function transformedCategory(categoryPath: string) {
  const transformedCategoryObj: TransformedCategory = {
    Retrospective: "회고록",
  }

  return transformedCategoryObj[categoryPath] || categoryPath.toUpperCase()
}
