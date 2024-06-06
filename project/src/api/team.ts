import { Player } from '@/model/player'
import { Team, TeamDetails } from '@/model/team'

export async function getTeamDetails(teamId: Team['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}`)
  const team = (await response.json()) as TeamDetails

  return team
}

export async function getTeamPlayers(teamId: Team['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/players`)
  const players = (await response.json()) as Player[]

  return players
}
