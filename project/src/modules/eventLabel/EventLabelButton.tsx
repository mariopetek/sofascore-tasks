import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import EventLabel from './EventLabel'
import { Box } from '@kuma-ui/core'

interface EventLabelButtonProps {
  event: Event
}

export default function EventLabelButton({ event }: EventLabelButtonProps) {
  const { selectedEvent, setSelectedEvent, setIsDetailsPanelOpen } = useEventDetailsContext()
  const isActive = () => selectedEvent?.id === event.id

  function handleEventClick() {
    setIsDetailsPanelOpen(true)
    setSelectedEvent(event)
  }

  return (
    <Box
      onClick={handleEventClick}
      bg={isActive() ? 'colors.primary.highlight' : 'colors.surface.s1'}
      _hover={{ bg: isActive() ? 'colors.primary.highlight' : 'colors.surface.s2' }}
    >
      <EventLabel event={event} />
    </Box>
  )
}
