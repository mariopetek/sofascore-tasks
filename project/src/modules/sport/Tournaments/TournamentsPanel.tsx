import { Tournament } from '@/model/tournament'
import { Box, Heading } from '@kuma-ui/core'
import TournamentLabel from './TournamentLabel'
import { Sport } from '@/model/sport'

interface TournamentsPanelProps {
  tournaments: Tournament[]
  sportSlug: Sport['slug']
}

export default function TournamentsPanel({ tournaments, sportSlug }: TournamentsPanelProps) {
  return (
    <Box
      backgroundColor="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
      maxWidth="448px"
      width="100%"
      paddingY="spacings.lg"
    >
      <Heading
        as="h2"
        fontSize="fontSizes.lg"
        fontWeight="fontWeights.bold"
        color="colors.onSurface.lv1"
        paddingX="spacings.lg"
        paddingY="spacings.md"
      >
        Leagues
      </Heading>
      <Box display="flex" flexDirection="column">
        {tournaments.map(tournament => (
          <TournamentLabel key={tournament.id} tournament={tournament} sportSlug={sportSlug} />
        ))}
      </Box>
    </Box>
  )
}
