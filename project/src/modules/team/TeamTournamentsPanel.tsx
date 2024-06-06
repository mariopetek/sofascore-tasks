import { Tournament } from '@/model/tournament'
import { Box, Heading, Image } from '@kuma-ui/core'

interface TeamTournamentsPanelProps {
  tournaments: Tournament[]
}

export default function TeamTournamentsPanel({ tournaments }: TeamTournamentsPanelProps) {
  return (
    <Box
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      color="colors.onSurface.lv1"
      paddingBottom="spacings.lg"
      borderRadius="radii.lg"
    >
      <Heading
        as="h2"
        paddingX="spacings.xxxl"
        paddingTop="spacings.lg"
        paddingBottom="spacings.md"
        textAlign="center"
        fontSize="fontSizes.md"
        fontWeight="bold"
        color="colors.onSurface.lv1"
      >
        Tournaments
      </Heading>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr">
        {tournaments.map(tournament => (
          <Box display="flex" flexDirection="column" alignItems="center" padding="spacings.md">
            <Image
              src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
              alt={tournament.name}
              width="40px"
              height="40px"
            />
            <Box
              as="span"
              color="colors.onSurface.lv2"
              fontSize="fontSizes.xs"
              paddingY="spacings.md"
              textAlign="center"
            >
              {tournament.name}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
