import { GoalIncidentGoalType, Incident, isGoalIncident } from '@/model/event'
import { Box, Image } from '@kuma-ui/core'

interface BasketballIncidentProps {
  incident: Incident
}

function getGoalIncidentIconSrc(type: GoalIncidentGoalType) {
  switch (type) {
    case 'onepoint':
      return '/icons/incident/basketball/ic_num_basketball_incident_1.svg'
    case 'twopoint':
      return '/icons/incident/basketball/ic_num_basketball_incident_2.svg'
    case 'threepoint':
      return '/icons/incident/basketball/ic_num_basketball_incident_3.svg'
  }
}

export default function BasketballIncident({ incident }: BasketballIncidentProps) {
  return isGoalIncident(incident) ? (
    <Box
      paddingX="spacings.lg"
      paddingY="spacings.sm"
      display="flex"
      gap="spacings.lg"
      flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
      alignItems="center"
    >
      <Box
        display="flex"
        gap="spacings.lg"
        flex="1"
        flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
      >
        <Image src={getGoalIncidentIconSrc(incident.goalType)} alt={incident.goalType} width="24px" height="24px" />
        <Box width="1px" bg="colors.onSurface.lv4"></Box>
        <Box
          as="span"
          color="colors.onSurface.lv1"
          fontWeight="fontWeights.bold"
          fontSize="fontSizes.sm"
          alignSelf="center"
        >
          {incident.homeScore} - {incident.awayScore}
        </Box>
      </Box>
      <Box flex="1" display="flex" flexDirection="column" alignSelf="center">
        <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs" textAlign="center">
          {incident.time}'
        </Box>
      </Box>
      <Box flex="1"></Box>
    </Box>
  ) : null
}
