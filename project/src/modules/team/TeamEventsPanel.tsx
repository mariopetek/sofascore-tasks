import { getTeamEventsClient } from '@/api/team'
import { TeamDetails } from '@/model/team'
import { Box } from '@kuma-ui/core'
import { useEffect, useState } from 'react'
import EventsPanelRounds from '../EventsPanelRounds'
import { useEventDetailsContext } from '@/context/EventDetailsContext'

interface TeamEventsPanelProps {
  team: TeamDetails
}
export default function TeamEventsPanel({ team }: TeamEventsPanelProps) {
  const { setSelectedEvent, setIsDetailsPanelOpen } = useEventDetailsContext()
  const [span, setSpan] = useState<'last' | 'next'>('next')
  const [page, setPage] = useState(0)

  useEffect(() => {
    setSelectedEvent(null)
    setIsDetailsPanelOpen(false)
  }, [page])

  const { events, eventsError, eventsLoading } = getTeamEventsClient(team.id, span, page)
  const { events: previousEvents } = getTeamEventsClient(
    team.id,
    span === 'next' && page === 0 ? 'last' : span,
    span === 'next' && page > 0 ? page - 1 : span === 'next' && page === 0 ? 0 : page + 1
  )
  const { events: nextEvents } = getTeamEventsClient(
    team.id,
    span === 'last' && page === 0 ? 'next' : span,
    span === 'last' && page > 0 ? page - 1 : span === 'last' && page === 0 ? 0 : page + 1
  )

  return (
    <Box
      maxWidth="448px"
      width="100%"
      borderRadius="radii.lg"
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingY="spacings.lg"
    >
      <EventsPanelRounds
        events={events}
        eventsError={eventsError}
        eventsLoading={eventsLoading}
        nextEvents={nextEvents}
        previousEvents={previousEvents}
        span={span}
        setSpan={setSpan}
        page={page}
        setPage={setPage}
      />
    </Box>
  )
}
