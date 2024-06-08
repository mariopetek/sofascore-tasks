import { Event, Incident, isPeriodIncident } from '@/model/event'
import { Box } from '@kuma-ui/core'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import FootballIncident from './football/FootballIncident'
import BasketballIncident from './basketball/BasketballIncident'
import AmericanFootballIncident from './americanFootball/AmericanFootballIncident'

interface EventDetailsIncidentsProps {
  incidents: Incident[]
  event: Event
}

export default function EventDetailsIncidents({ incidents, event }: EventDetailsIncidentsProps) {
  const newestIncidents = useMemo(() => {
    return incidents.toReversed()
  }, [incidents])

  function formatPeriodIncidentText(incidentText: string) {
    return `${incidentText.split(' ')[0]} (${incidentText.split(' ')[1]})`
  }

  const eventTournament = event.tournament
  const eventSport = eventTournament.sport

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
          <Link href={`/${eventSport.slug}/tournament/${eventTournament.id}`}>
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
        newestIncidents.map((incident, index) => (
          <Fragment key={incident.id}>
            {isPeriodIncident(incident) ? (
              <Box padding="spacings.sm">
                <Box
                  bg="colors.secondary.highlight"
                  paddingY="spacings.xs"
                  borderRadius="radii.lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.xs" fontWeight="fontWeights.bold">
                    {formatPeriodIncidentText(incident.text)}
                  </Box>
                </Box>
              </Box>
            ) : null}
            {eventSport.slug === 'football' ? (
              <FootballIncident incident={incident} />
            ) : eventSport.slug === 'basketball' ? (
              <>
                <BasketballIncident incident={incident} />
                {incident.type !== 'period' &&
                newestIncidents[index + 1] !== undefined &&
                newestIncidents[index + 1].type !== 'period' ? (
                  <Box display="flex" justifyContent="center">
                    <Box bg="colors.onSurface.lv2" height="1px" width="24px"></Box>
                  </Box>
                ) : null}
              </>
            ) : eventSport.slug === 'american-football' ? (
              <AmericanFootballIncident incident={incident} />
            ) : null}
          </Fragment>
        ))
      )}
    </Box>
  )
}
