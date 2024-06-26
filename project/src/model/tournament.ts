import { Country } from './country'
import { Sport } from './sport'
import { Team } from './team'

export interface Tournament {
  id: number
  name: string
  slug: string
  sport: Sport
  country: Country
}

export interface StandingRow {
  id: number
  team: Team
  points: number | null
  scoresFor: number
  scoresAgainst: number
  played: number
  wins: number
  draws: number
  losses: number
  percentage: number | null
}

type StandingsType = 'total' | 'home' | 'away'

export interface TournamentStanding {
  id: number
  tournament: Tournament
  type: StandingsType
  sortedStandingsRows: StandingRow[]
}
