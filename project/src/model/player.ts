import { Country } from './country'
import { Sport } from './sport'
import { Team } from './team'

export interface Player {
  id: number
  name: string
  slug: string
  country: Country
  position: string
}

export interface PlayerDetails extends Player {
  sport: Sport
  team: Team
  dateOfBirth: Date
}

export interface PlayerSearch extends Player {
  sport: Sport
}
