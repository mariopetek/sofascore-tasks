import { Event, Incident } from '@/model/event'
import EventDetailsHeading from '../EventDetailsHeading'
import EventDetailsIncidents from '../EventDetailsIncidents'
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
