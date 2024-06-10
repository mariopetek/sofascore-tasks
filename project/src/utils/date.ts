import { DateLocale } from '@/context/DateContext'
import { LanguageLocale } from '@/context/LanguageContext'

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

export function formatFullDateByLocale(date: Date, locale: DateLocale) {
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

export function formatDateByLocale(date: Date, locale: DateLocale) {
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
  })
}

export function getDateTimeByLocale(date: Date, language: DateLocale) {
  return date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })
}

export function getDateShortDayByLocale(date: Date, language: LanguageLocale) {
  return date.toLocaleDateString(language, { weekday: 'short' })
}

export function getDateLongDayByLocale(date: Date, language: LanguageLocale) {
  return date.toLocaleDateString(language, { weekday: 'long' })
}

export function getFullDateByLocale(date: Date, language: LanguageLocale) {
  return date.toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric' })
}
