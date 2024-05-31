import { Tournament } from '@/model/tournament'
import { Box, Image } from '@kuma-ui/core'

interface TournamentLabelProps {
  tournament: Tournament
}

export default function TournamentLabel({ tournament }: TournamentLabelProps) {
  return (
    <Box
      key={tournament.id}
      display="flex"
      alignItems="center"
      gap="spacings.lg"
      paddingX="spacings.lg"
      paddingY="spacings.sm"
      cursor="pointer"
      _hover={{
        bg: 'colors.surface.s2',
      }}
    >
      <Image
        src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
        alt={tournament.name}
        width="40px"
        height="40px"
      />
      <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
        {tournament.name}
      </Box>
    </Box>
  )
}
