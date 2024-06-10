import { Event, Incident } from '@/model/event'
import EventDetailsHeading from '../eventDetails/EventDetailsHeading'
import EventDetailsIncidents from '../eventDetails/EventDetailsIncidents'
import Separator from '@/components/Separator'
import StyledPanel from '../styledComponents/StyledPanel'

interface EventDetailsPanelProps {
  event: Event
  incidents: Incident[]
}

export default function EventDetailsPanel({ event, incidents }: EventDetailsPanelProps) {
  return (
    <StyledPanel>
      <EventDetailsHeading event={event} />
      <Separator />
      <EventDetailsIncidents incidents={incidents} event={event} />
    </StyledPanel>
  )
}
