import { Event } from '@/model/event'
import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import { formatDateWithDashes } from '@/utils/date'
import useSWR from 'swr'

const SPORTS_URL = '/api/sports'
const SPORT_URL = '/api/sport'

export function getSports() {
  const { data, error } = useSWR<Sport[]>(SPORTS_URL)

  return {
    sports: data,
    sportsError: error,
  }
}

export async function getSportTournaments(sportSlug: Sport['slug']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/sport/${sportSlug}/tournaments`)
  const tournaments = (await response.json()) as Tournament[]

  return tournaments
}

export function getSportEventsByDate(sportSlug: Sport['slug'], date: Date) {
  const formattedDate = formatDateWithDashes(date)
  const { data, error, isLoading } = useSWR<Event[]>(`${SPORT_URL}/${sportSlug}/events/${formattedDate}`)

  return {
    sportEvents: data,
    sportEventsError: error,
    sportEventsLoading: isLoading,
  }
}
