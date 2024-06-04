export function datesAroundDate(date: Date, n: number) {
  const dates = []
  for (let i = -n; i <= n; i++) {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + i)
    dates.push(isoDateFormat(newDate))
  }
  return dates
}

export function isoDateFormat(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function europeanDayMonthDateFormat(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${day}.${month}.`
}

export function europeanDateFormat(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
