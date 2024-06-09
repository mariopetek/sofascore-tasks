import { TeamDetails } from '@/model/team'
import { Box, Heading } from '@kuma-ui/core'
import { useTranslation } from 'react-i18next'

interface TeamVenuePanelProps {
  teamVenue: TeamDetails['venue']
}

export default function TeamVenuePanel({ teamVenue }: TeamVenuePanelProps) {
  const [t] = useTranslation('global')

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
        textAlign="center"
        paddingY="spacings.lg"
        paddingX="spacings.xxxl"
        fontSize="fontSizes.md"
        fontWeight="fontWeights.bold"
      >
        {t('teamVenuePanel.venue')}
      </Heading>
      <Box
        paddingX="spacings.lg"
        paddingY="spacings.sm"
        display="flex"
        justifyContent="space-between"
        fontSize="fontSizes.sm"
      >
        <Box as="span">{t('teamVenuePanel.stadium')}</Box>
        <Box as="span">{teamVenue}</Box>
      </Box>
    </Box>
  )
}
