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

type CardIncidentColor = 'yellow' | 'yellowred' | 'red'

type GoalIncidentGoalType =
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

interface IncidentCommon {
  id: number
  time: number
  type: IncidentType
}

interface CardIncident extends IncidentCommon {
  player: Player
  teamSide: IncidentSide
  color: CardIncidentColor
}

interface GoalIncident extends IncidentCommon {
  player: Player
  scoringTeam: IncidentSide
  homeScore: number
  awayScore: number
  goalType: GoalIncidentGoalType
}

interface PeriodIncident extends IncidentCommon {
  text: string
}

export type Incident = CardIncident | GoalIncident | PeriodIncident
