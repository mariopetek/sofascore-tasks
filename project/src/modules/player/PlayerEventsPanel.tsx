import { getPlayerEventsClient } from '@/api/player'
import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Player } from '@/model/player'
import { useEffect, useState } from 'react'
import EventsPanelRounds from '../EventsPanelRounds'
import StyledPanel from '../styledComponents/StyledPanel'

interface PlayerEventsPanelProps {
  player: Player
}
export default function PlayerEventsPanel({ player }: PlayerEventsPanelProps) {
  const { setSelectedEvent, setIsDetailsPanelOpen } = useEventDetailsContext()
  const [span, setSpan] = useState<'last' | 'next'>('next')
  const [page, setPage] = useState(0)

  useEffect(() => {
    setSelectedEvent(null)
    setIsDetailsPanelOpen(false)
  }, [page])

  const { events, eventsError, eventsLoading } = getPlayerEventsClient(player.id, span, page)
  const { events: previousEvents } = getPlayerEventsClient(
    player.id,
    span === 'next' && page === 0 ? 'last' : span,
    span === 'next' && page > 0 ? page - 1 : span === 'next' && page === 0 ? 0 : page + 1
  )
  const { events: nextEvents } = getPlayerEventsClient(
    player.id,
    span === 'last' && page === 0 ? 'next' : span,
    span === 'last' && page > 0 ? page - 1 : span === 'last' && page === 0 ? 0 : page + 1
  )

  return (
    <StyledPanel>
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
    </StyledPanel>
  )
}
