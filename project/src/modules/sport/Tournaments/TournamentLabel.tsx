import { TournamentWithLogo } from '@/model/tournament'
import { Box, Image } from '@kuma-ui/core'

interface TournamentLabelProps {
  tournament: TournamentWithLogo
}

export default function TournamentLabel({ tournament }: TournamentLabelProps) {
  return (
    <Box
      key={tournament.id}
      marginBottom="spacings.lg"
      display="flex"
      alignItems="center"
      gap="16px"
      paddingTop="spacings.sm"
    >
      <Image src={tournament.logo} alt={tournament.name} width={40} height={40} />
      <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
        {tournament.name}
      </Box>
    </Box>
  )
}
