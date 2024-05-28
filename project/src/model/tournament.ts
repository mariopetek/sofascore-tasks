import { Sport } from './sport'

interface Country {
  id: number
  name: string
}

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
