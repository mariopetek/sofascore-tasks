import { Event } from '@/model/event'
import { Tournament, TournamentStanding } from '@/model/tournament'
import useSWR from 'swr'

export async function getTournamentDetails(tournamentId: Tournament['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}`)
  const sports = (await response.json()) as Tournament

  return sports
}

export async function getTournamentEvents(tournamentId: Tournament['id'], span: 'last' | 'next', page: number) {
  const response = await fetch(
    `https://academy-backend.sofascore.dev/tournament/${tournamentId}/events/${span}/${page}`
  )
  const events = (await response.json()) as Event[]

  return events
}

export async function getTournamentStandings(tournamentId: Tournament['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/standings`)
  const standings = (await response.json()) as TournamentStanding[]

  return standings
}

export function getTournamentStandingsClient(tournamentId: Tournament['id']) {
  const { data, isLoading } = useSWR<TournamentStanding[]>(`/api/tournament/${tournamentId}/standings`)

  return {
    standings: data,
    standingsLoading: isLoading,
  }
}
