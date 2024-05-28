export function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDatesAroundToday(n: number) {
  const today = new Date()
  const dates = []
  for (let i = -n; i <= n; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(formatDate(date))
  }
  return dates
}

export function formatDateWithNoSpaces(date: Date) {
  const formattedDate = new Intl.DateTimeFormat('hr-HR', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
  const noSpacesDate = formattedDate.replace(/(\d{1,2}\.)\s+(\d{1,2}\.)/, '$1$2')
  return noSpacesDate
}
