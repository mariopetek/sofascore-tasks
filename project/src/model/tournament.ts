import { Country } from './country'
import { Sport } from './sport'

export interface Tournament {
  id: number
  name: string
  slug: string
  sport: Sport
  country: Country
}

export interface TournamentWithLogo extends Tournament {
  logo: string
}
