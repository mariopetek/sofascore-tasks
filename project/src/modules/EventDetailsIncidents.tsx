import { Incident } from '@/model/event'
import { Tournament } from '@/model/tournament'
import { Box } from '@kuma-ui/core'
import Link from 'next/link'

interface EventDetailsIncidentsProps {
  incidents: Incident[]
  tournament: Tournament
}

export default function EventDetailsIncidents({ incidents, tournament }: EventDetailsIncidentsProps) {
  return (
    <Box paddingTop="spacings.sm" paddingBottom="spacings.lg">
      {incidents.length === 0 ? (
        <Box
          paddingX="spacings.sm"
          paddingTop="spacings.sm"
          paddingBottom="spacings.xxxl"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="spacings.lg"
        >
          <Box
            bg="colors.surface.s2"
            borderRadius="radii.md"
            paddingY="spacings.lg"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.sm">
              No results yet.
            </Box>
          </Box>
          <Link href={`/${tournament.sport.slug}/tournament/${tournament.id}`}>
            <Box
              borderWidth="2px"
              borderStyle="solid"
              borderColor="colors.primary.default"
              borderRadius="radii.xs"
              paddingX="spacings.lg"
              paddingY="spacings.sm"
              color="colors.primary.default"
              fontSize="fontSizes.md"
              fontWeight="fontWeights.bold"
            >
              View Tournament Details
            </Box>
          </Link>
        </Box>
      ) : (
        incidents.map(incident => <Box key={incident.id}></Box>)
      )}
    </Box>
  )
}
