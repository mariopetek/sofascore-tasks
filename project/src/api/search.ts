import { PlayerSearch } from '@/model/player'
import { TeamSearch } from '@/model/team'
import useSWR from 'swr'

export function searchPlayersClient(query: string) {
  const { data, error, isLoading } = useSWR<PlayerSearch[]>(`/api/search/player/${query}`)

  return {
    players: data,
    playersError: error,
    playersLoading: isLoading,
  }
}

export function searchTeamsClient(query: string) {
  const { data, error, isLoading } = useSWR<TeamSearch[]>(`/api/search/team/${query}`)

  return {
    teams: data,
    teamsError: error,
    teamsLoading: isLoading,
  }
}
