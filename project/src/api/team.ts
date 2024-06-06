import { Event } from '@/model/event'
import { Player } from '@/model/player'
import { Team, TeamDetails } from '@/model/team'
import { Tournament } from '@/model/tournament'

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

export async function getTeamTournaments(teamId: Team['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/tournaments`)
  const tournaments = (await response.json()) as Tournament[]

  return tournaments
}

export async function getTeamEvents(teamId: Team['id'], span: 'last' | 'next', page: number) {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/events/${span}/${page}`)
  const events = (await response.json()) as Event[]

  return events
}
