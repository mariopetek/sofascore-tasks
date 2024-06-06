import { TeamDetails } from '@/model/team'
import { Box, Heading } from '@kuma-ui/core'

interface TeamVenuePanelProps {
  teamVenue: TeamDetails['venue']
}

export default function TeamVenuePanel({ teamVenue }: TeamVenuePanelProps) {
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
        paddingX="spacings.xxl"
        fontSize="fontSizes.md"
        fontWeight="fontWeights.bold"
      >
        Venue
      </Heading>
      <Box
        paddingX="spacings.lg"
        paddingY="spacings.sm"
        display="flex"
        justifyContent="space-between"
        fontSize="fontSizes.sm"
      >
        <Box as="span">Stadium</Box>
        <Box as="span">{teamVenue}</Box>
      </Box>
    </Box>
  )
}
