import { Event, Incident } from '@/model/event'
import { Box } from '@kuma-ui/core'
import EventDetailsHeading from '../EventDetailsHeading'
import EventDetailsIncidents from '../EventDetailsIncidents'
import Separator from '@/components/Separator'

interface EventDetailsPanelProps {
  event: Event
  incidents: Incident[]
}

export default function EventDetailsPanel({ event, incidents }: EventDetailsPanelProps) {
  return (
    <Box
      maxWidth="448px"
      width="100%"
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
    >
      <EventDetailsHeading event={event} />
      <Separator />
      <EventDetailsIncidents incidents={incidents} event={event} />
    </Box>
  )
}
