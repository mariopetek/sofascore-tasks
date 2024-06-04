import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import { isoDateFormat } from '@/utils/date'

export async function getSports() {
  const response = await fetch('https://academy-backend.sofascore.dev/sports')
  const sports = (await response.json()) as Sport[]

  return sports
}

export async function getSportTournaments(sportSlug: Sport['slug']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/sport/${sportSlug}/tournaments`)
  const tournaments = (await response.json()) as Tournament[]

  return tournaments
}

export async function getSportEventsByDate(sportSlug: Sport['slug'], date: Date) {
  const isoDate = isoDateFormat(date)
  const response = await fetch(`https://academy-backend.sofascore.dev/sport/${sportSlug}/events/${isoDate}`)
  const events = (await response.json()) as Event[]

  return events
}
