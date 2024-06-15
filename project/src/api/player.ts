import { Event } from '@/model/event'
import { Player, PlayerDetails } from '@/model/player'
import useSWR from 'swr'

export async function getPlayerDetails(playerId: Player['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}`)
  const player = (await response.json()) as PlayerDetails

  return player
}

export function getPlayerEventsClient(playerId: Player['id'], span: 'last' | 'next', page: number) {
  const { data, isLoading, error } = useSWR<Event[]>(`/api/player/${playerId}/events/${span}/${page}`)

  return {
    events: data,
    eventsError: error,
    eventsLoading: isLoading,
  }
}
