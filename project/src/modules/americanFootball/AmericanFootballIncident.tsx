import { GoalIncidentGoalType, Incident, isGoalIncident } from '@/model/event'
import { Box, Image } from '@kuma-ui/core'

interface AmericanFootballIncidentProps {
  incident: Incident
}

function getGoalIncidentIconSrc(type: GoalIncidentGoalType) {
  switch (type) {
    case 'fieldgoal':
      return '/icons/incident/americanFootball/ic_field_goal.svg'
    case 'onepoint':
      return '/icons/incident/americanFootball/ic_num_rugby_point_1.svg'
    case 'twopoint':
      return '/icons/incident/americanFootball/ic_num_rugby_point_2.svg'
    case 'threepoint':
      return '/icons/incident/americanFootball/ic_num_rugby_point_3.svg'
    case 'extrapoint':
      return '/icons/incident/americanFootball/ic_extra_point.svg'
    case 'safety':
      return '/icons/incident/americanFootball/ic_rogue.svg'
    case 'touchdown':
      return '/icons/incident/americanFootball/ic_touchdown.svg'
  }
}

export default function AmericanFootballIncident({ incident }: AmericanFootballIncidentProps) {
  return isGoalIncident(incident) ? (
    <Box
      paddingX="spacings.lg"
      paddingY="spacings.sm"
      display="flex"
      gap="spacings.lg"
      flexDirection={incident.scoringTeam === 'home' ? 'row' : 'row-reverse'}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image src={getGoalIncidentIconSrc(incident.goalType)} width="24px" height="24px" />
        <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs">
          {incident.time}'
        </Box>
      </Box>
      <Box width="1px" bg="colors.onSurface.lv2"></Box>
      <Box
        as="span"
        color="colors.onSurface.lv1"
        fontWeight="fontWeights.bold"
        fontSize="fontSizes.lg"
        alignSelf="center"
      >
        {incident.homeScore} - {incident.awayScore}
      </Box>
      <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" alignSelf="center">
        {incident.player.name}
      </Box>
    </Box>
  ) : null
}
