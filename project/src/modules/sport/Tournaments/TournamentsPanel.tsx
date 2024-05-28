import { Tournament, TournamentWithLogo } from '@/model/tournament'
import { Box, Heading } from '@kuma-ui/core'
import TournamentLabel from './TournamentLabel'

interface TournamentsPanelProps {
  tournaments: TournamentWithLogo[]
}

export default function TournamentsPanel({ tournaments }: TournamentsPanelProps) {
  return (
    <Box
      backgroundColor="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      padding="spacings.lg"
      borderRadius="radii.lg"
      maxWidth="448px"
      width="100%"
    >
      <Heading
        as="h2"
        fontSize="fontSizes.lg"
        fontWeight="fontWeights.bold"
        color="colors.onSurface.lv1"
        margin="10px 0"
      >
        Leagues
      </Heading>
      <Box>
        {tournaments.map(tournament => (
          <TournamentLabel key={tournament.id} tournament={tournament} />
        ))}
      </Box>
    </Box>
  )
}
