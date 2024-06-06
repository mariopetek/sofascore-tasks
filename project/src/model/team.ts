import { Country } from './country'

export interface Team {
  id: number
  name: string
  country: Country
}

export interface TeamDetails extends Team {
  managerName: string
  venue: string
}
