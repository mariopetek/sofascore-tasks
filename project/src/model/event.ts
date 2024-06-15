import { Player } from './player'
import { Score } from './score'
import { Team } from './team'
import { Tournament } from './tournament'

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

type EventStatus = 'notstarted' | 'finished' | 'inprogress'

type IncidentType = 'card' | 'goal' | 'period'

type IncidentSide = 'home' | 'away'

export type CardIncidentColor = 'yellow' | 'yellowred' | 'red'

export type GoalIncidentGoalType =
  | 'regular'
  | 'owngoal'
  | 'penalty'
  | 'onepoint'
  | 'twopoint'
  | 'threepoint'
  | 'touchdown'
  | 'safety'
  | 'fieldgoal'
  | 'extrapoint'

type IncidentCommon = {
  id: number
  time: number
  type: IncidentType
}

type CardIncident = IncidentCommon & {
  player: Player
  teamSide: IncidentSide
  color: CardIncidentColor
}

type GoalIncident = IncidentCommon & {
  player: Player
  scoringTeam: IncidentSide
  homeScore: number
  awayScore: number
  goalType: GoalIncidentGoalType
}

type PeriodIncident = IncidentCommon & {
  text: string
}

export type Incident = CardIncident | GoalIncident | PeriodIncident

export function isCardIncident(incident: Incident): incident is CardIncident {
  return incident.type === 'card'
}

export function isGoalIncident(incident: Incident): incident is GoalIncident {
  return incident.type === 'goal'
}

export function isPeriodIncident(incident: Incident): incident is PeriodIncident {
  return incident.type === 'period'
}
