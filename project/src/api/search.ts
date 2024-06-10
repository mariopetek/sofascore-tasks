import { Player } from '@/model/player'
import { Team } from '@/model/team'
import useSWR from 'swr'

export function searchPlayersClient(query: string) {
  const { data, error, isLoading } = useSWR<Player[]>(`/api/search/player/${query}`)

  return {
    players: data,
    playersError: error,
    playersLoading: isLoading,
  }
}

export function searchTeamsClient(query: string) {
  const { data, error, isLoading } = useSWR<Team[]>(`/api/search/team/${query}`)

  return {
    teams: data,
    teamsError: error,
    teamsLoading: isLoading,
  }
}
