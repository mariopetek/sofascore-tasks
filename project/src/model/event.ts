import { Score } from './score'
import { Team } from './team'
import { Tournament } from './tournament'

type EventStatus = 'notstarted' | 'finished' | 'live'

export interface Event {
  id: number
  slug: string
  tournament: Tournament
  homeTeam: Team
  awayTeam: Team
  status: EventStatus
  startDate: Date
  homeScore: Score
  awayScore: Score
  winnerCode: string
  round: number
}
