import { getEventIncidentsClient } from '@/api/event'
import { Event } from '@/model/event'
import EventDetailsIncidents from './EventDetailsIncidents'
import { Box } from '@kuma-ui/core'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'

interface EventIncidentsWrapperProps {
  event: Event
}

export default function EventIncidentsWrapper({ event }: EventIncidentsWrapperProps) {
  const { incidents, incidentsError, incidentsLoading } = getEventIncidentsClient(event.id)
  return (
    <>
      {incidents ? <EventDetailsIncidents incidents={incidents} event={event} /> : null}
      {incidentsLoading ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <Loader />
        </Box>
      ) : null}
      {incidentsError ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <ErrorMessage message="Failed to load incidents" />
        </Box>
      ) : null}
    </>
  )
}
