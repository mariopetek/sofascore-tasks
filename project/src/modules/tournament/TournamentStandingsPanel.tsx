import { StandingRow, TournamentStanding } from '@/model/tournament'
import { Box } from '@kuma-ui/core'

interface TournamentStandingsPanelProps {
  standings: StandingRow[]
}

export default function TournamentStandingsPanel({ standings }: TournamentStandingsPanelProps) {
  return (
    <Box
      maxWidth="920px"
      width="100%"
      borderRadius="radii.lg"
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingBottom="spacings.lg"
      fontSize="fontSizes.sm"
    >
      <Box padding="spacings.lg" display="flex" justifyContent="space-evenly" color="colors.onSurface.lv2">
        <Box display="flex" alignItems="center" gap="spacings.lg" flex="2">
          <Box as="span" width="24px" textAlign="center">
            #
          </Box>
          <Box as="span">Team</Box>
        </Box>
        <Box flex="3" display="flex" justifyContent="space-between" textAlign="center">
          <Box as="span" maxWidth="62px" width="100%">
            P
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            W
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            D
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            L
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            Goals
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            {standings[0].points ? 'PTS' : standings[0].percentage ? 'PCT' : null}
          </Box>
        </Box>
      </Box>
      {standings.map((standingRow, index) => (
        <Box
          key={standingRow.id}
          padding="spacings.lg"
          display="flex"
          justifyContent="space-between"
          color="colors.onSurface.lv1"
        >
          <Box display="flex" alignItems="center" gap="spacings.lg" flex="2">
            <Box
              as="span"
              width="24px"
              height="24px"
              padding="spacings.xs"
              bg="colors.secondary.default"
              textAlign="center"
              borderRadius="50%"
            >
              {index + 1}
            </Box>
            <Box as="span">{standingRow.team.name}</Box>
          </Box>
          <Box flex="3" display="flex" justifyContent="space-between" textAlign="center">
            <Box as="span" maxWidth="62px" width="100%">
              {standingRow.played}
            </Box>
            <Box as="span" maxWidth="62px" width="100%">
              {standingRow.wins}
            </Box>
            <Box as="span" maxWidth="62px" width="100%">
              {standingRow.draws}
            </Box>
            <Box as="span" maxWidth="62px" width="100%">
              {standingRow.losses}
            </Box>
            <Box as="span" maxWidth="62px" width="100%">
              {standingRow.scoresFor}:{standingRow.scoresAgainst}
            </Box>
            <Box as="span" maxWidth="62px" width="100%">
              {standingRow.points
                ? standingRow.points
                : standingRow.percentage
                ? standingRow.percentage.toFixed(3)
                : null}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
