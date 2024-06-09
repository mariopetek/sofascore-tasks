import { getTournamentEventsClient } from '@/api/tournament'
import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Tournament } from '@/model/tournament'
import { Box } from '@kuma-ui/core'
import { useEffect, useState } from 'react'
import EventsPanelRounds from '../EventsPanelRounds'

interface EventsPanelRoundsProps {
  tournament: Tournament
}

export default function TournamentEventsPanel({ tournament }: EventsPanelRoundsProps) {
  const { setSelectedEvent, setIsDetailsPanelOpen } = useEventDetailsContext()
  const [span, setSpan] = useState<'last' | 'next'>('next')
  const [page, setPage] = useState(0)

  useEffect(() => {
    setSelectedEvent(null)
    setIsDetailsPanelOpen(false)
  }, [tournament.id, page, span])

  const { events, eventsError, eventsLoading } = getTournamentEventsClient(tournament.id, span, page)
  const { events: previousEvents } = getTournamentEventsClient(
    tournament.id,
    span === 'next' && page === 0 ? 'last' : span,
    span === 'next' && page > 0 ? page - 1 : span === 'next' && page === 0 ? 0 : page + 1
  )
  const { events: nextEvents } = getTournamentEventsClient(
    tournament.id,
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
