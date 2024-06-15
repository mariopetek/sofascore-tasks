import { Sport } from '@/model/sport'
import { StandingRow } from '@/model/tournament'
import { Box } from '@kuma-ui/core'
import StandingsLeaderboard from '../StandingsLeaderboard'

interface TournamentStandingsPanelProps {
  standings: StandingRow[]
  sportSlug: Sport['slug']
}

export default function TournamentStandingsPanel({ standings, sportSlug }: TournamentStandingsPanelProps) {
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
      <StandingsLeaderboard standings={standings} sportSlug={sportSlug} />
    </Box>
  )
}
