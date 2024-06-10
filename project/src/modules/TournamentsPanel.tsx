import { Tournament } from '@/model/tournament'
import { Box, Heading } from '@kuma-ui/core'
import TournamentLabel from './TournamentLabel'
import { useTranslation } from 'react-i18next'
import StyledPanel from './styledComponents/StyledPanel'

interface TournamentsPanelProps {
  tournaments: Tournament[]
}

export default function TournamentsPanel({ tournaments }: TournamentsPanelProps) {
  const [t] = useTranslation('global')

  return (
    <StyledPanel>
      <Heading
        as="h2"
        fontSize="fontSizes.lg"
        fontWeight="fontWeights.bold"
        color="colors.onSurface.lv1"
        paddingX="spacings.lg"
        paddingY="spacings.md"
      >
        {t('tournamentsPanel.leagues')}
      </Heading>
      <Box display="flex" flexDirection="column">
        {tournaments.map(tournament => (
          <TournamentLabel key={tournament.id} tournament={tournament} />
        ))}
      </Box>
    </StyledPanel>
  )
}
