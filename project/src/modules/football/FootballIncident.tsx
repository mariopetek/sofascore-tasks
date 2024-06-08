import { CardIncidentColor, GoalIncidentGoalType, Incident, isCardIncident, isGoalIncident } from '@/model/event'
import { Image } from '@kuma-ui/core'
import { Box } from '@kuma-ui/core'

interface FootballIncidentProps {
  incident: Incident
}

function getGoalIncidentIconSrc(type: GoalIncidentGoalType) {
  switch (type) {
    case 'regular':
      return '/icons/incident/football/ic_ball_football.svg'
    case 'owngoal':
      return '/icons/incident/football/ic_autogoal.svg'
    case 'penalty':
      return '/icons/incident/football/ic_penalty_score.svg'
  }
}

function getCardIncidentIconSrc(color: CardIncidentColor) {
  switch (color) {
    case 'yellow':
      return '/icons/incident/football/ic_card_yellow.svg'
    case 'red':
      return '/icons/incident/football/ic_card_red.svg'
    case 'yellowred':
      return '/icons/incident/football/ic_card_red.svg'
  }
}

export default function FootballIncident({ incident }: FootballIncidentProps) {
  return (
    <>
      {isGoalIncident(incident) ? (
        <Box
          paddingX="spacings.lg"
          paddingY="spacings.sm"
          gap="spacings.lg"
          display="flex"
          flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image src={getGoalIncidentIconSrc(incident.goalType)} width="24px" height="24px" />
            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs">
              {incident.time}'
            </Box>
          </Box>
          <Box width="1px" bg="colors.onSurface.lv4"></Box>
          <Box
            as="span"
            color="colors.onSurface.lv1"
            fontSize="fontSizes.lg"
            fontWeight="fontWeights.bold"
            alignSelf="center"
          >
            {incident.homeScore} - {incident.awayScore}
          </Box>
          <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.md" alignSelf="center">
            {incident.player.name}
          </Box>
        </Box>
      ) : null}
      {isCardIncident(incident) ? (
        <Box
          paddingX="spacings.lg"
          paddingY="spacings.sm"
          gap="spacings.lg"
          display="flex"
          flexDirection={incident.teamSide === 'home' ? 'row' : 'row-reverse'}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            {incident.color === 'yellowred' ? (
              <Box display="flex" flexDirection={incident.teamSide === 'home' ? 'row' : 'row-reverse'}>
                <Image src={getCardIncidentIconSrc('red')} width="24px" height="24px" />
                <Image src={getCardIncidentIconSrc('yellow')} width="24px" height="24px" />
              </Box>
            ) : (
              <Image src={getCardIncidentIconSrc(incident.color)} width="24px" height="24px" />
            )}

            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs">
              {incident.time}'
            </Box>
          </Box>
          <Box width="1px" bg="colors.onSurface.lv4"></Box>
          <Box
            display="flex"
            flexDirection="column"
            alignSelf="center"
            alignItems={incident.teamSide === 'home' ? 'flex-start' : 'flex-end'}
          >
            <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
              {incident.player.name}
            </Box>
            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs">
              {incident.type}
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  )
}
