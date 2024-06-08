import { Event } from '@/model/event'
import { Box, Button } from '@kuma-ui/core'
import EventLabel from '../EventLabel'
import { useState } from 'react'
import { Tournament } from '@/model/tournament'

interface TournamentEventsPanelProps {
  events: Event[]
  tournamentId: Tournament['id']
}

export default function TournamentEventsPanel({ events, tournamentId }: TournamentEventsPanelProps) {
  const [span, setSpan] = useState<'last' | 'next'>('next')
  const [page, setPage] = useState(0)

  const groupedEventsByRound = events.reduce((acc, event) => {
    if (!acc[event.round]) {
      acc[event.round] = []
    }
    acc[event.round].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  function handleLeftButtonClick() {
    if (span === 'next') {
      if (page === 0) {
        setSpan('last')
      } else {
        setPage(page - 1)
      }
    } else {
      setPage(page + 1)
    }
  }

  function handleRightButtonClick() {
    if (span === 'next') {
      setPage(page + 1)
    } else {
      if (page === 0) {
        setSpan('next')
      } else {
        setPage(page - 1)
      }
    }
  }

  const rounds = Object.keys(groupedEventsByRound)

  return (
    <Box
      maxWidth="448px"
      width="100%"
      borderRadius="radii.lg"
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingY="spacings.lg"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingX="spacings.lg"
        paddingY="spacings.xs"
      >
        <Button
          borderStyle="solid"
          borderRadius="radii.xs"
          borderColor="colors.primary.default"
          borderWidth="2px solid"
          bg="none"
          paddingX="spacings.lg"
          paddingY="spacings.sm"
          onClick={handleLeftButtonClick}
        >
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_chevron_left.svg)"
            backgroundColor="colors.primary.default"
            width="24px"
            height="24px"
          ></Box>
        </Button>
        <Box as="span" color="colors.onSurface.lv1" fontWeight="fontWeights.bold">
          Matches
        </Box>
        <Button
          borderStyle="solid"
          borderRadius="radii.xs"
          borderColor="colors.primary.default"
          borderWidth="2px"
          bg="colors.surface.s1"
          paddingX="spacings.lg"
          paddingY="spacings.sm"
          onClick={handleRightButtonClick}
        >
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_chevron_right.svg)"
            backgroundColor="colors.primary.default"
            width="24px"
            height="24px"
          ></Box>
        </Button>
      </Box>
      {rounds.map(round => (
        <Box key={round}>
          <Box
            paddingX="spacings.lg"
            paddingBottom="spacings.sm"
            paddingTop="spacings.xl"
            fontSize="fontSizes.xs"
            fontWeight="fontWeights.bold"
            color="colors.onSurface.lv1"
          >
            Round {round}
          </Box>
          {groupedEventsByRound[round].map(event => (
            <EventLabel key={event.id} event={event} />
          ))}
        </Box>
      ))}
    </Box>
  )
}
