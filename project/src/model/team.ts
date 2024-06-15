import { Country } from './country'
import { Sport } from './sport'

export interface Team {
  id: number
  name: string
  country: Country
}

export interface TeamDetails extends Team {
  managerName: string
  venue: string
}

export interface TeamSearch extends Team {
  sport: Sport
}
