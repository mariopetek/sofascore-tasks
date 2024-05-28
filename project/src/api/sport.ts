import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import useSWR from 'swr'

const SPORTS_URL = '/api/sports'

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
