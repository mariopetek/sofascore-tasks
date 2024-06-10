import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { useTrackedEventsContext } from '@/context/TrackedEventsContext'
import { Event } from '@/model/event'
import { Box } from '@kuma-ui/core'
import React, { MouseEvent } from 'react'

interface TrackEventButtonProps {
  event: Event
}

export default function TrackEventButton({ event }: TrackEventButtonProps) {
  const { events, setEvents } = useTrackedEventsContext()

  const isEventTracked = events.some(trackedEvent => trackedEvent.id === event.id)

  const { selectedEvent, setSelectedEvent, setIsDetailsPanelOpen } = useEventDetailsContext()

  function handleTrackEventClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    e.preventDefault()
    setEvents([...events, event])
  }

  function handleUntrackEventClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    e.preventDefault()
    setEvents(events.filter(trackedEvent => trackedEvent.id !== event.id))
    if (selectedEvent?.id === event.id) {
      setIsDetailsPanelOpen(false)
      setSelectedEvent(null)
    }
  }

  return isEventTracked ? (
    <Box
      maskSize="24px 24px"
      maskImage="url(/icons/system/bookmark.svg)"
      backgroundColor="colors.onSurface.lv2"
      width="24px"
      height="24px"
      onClick={handleUntrackEventClick}
      cursor="pointer"
    ></Box>
  ) : (
    <Box
      maskSize="24px 24px"
      maskImage="url(/icons/system/bookmark_outline.svg)"
      backgroundColor="colors.onSurface.lv2"
      width="24px"
      height="24px"
      onClick={handleTrackEventClick}
      cursor="pointer"
    ></Box>
  )
}
