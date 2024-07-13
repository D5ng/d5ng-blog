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

export function formatDate(date: string) {
  const transformedMonth = MONTHS_EN[dayjs(date).month()]
  const transformedDate = dayjs(date).date()
  const transformedyear = dayjs(date).year()

  return `${transformedMonth} ${transformedDate}, ${transformedyear}`
}
