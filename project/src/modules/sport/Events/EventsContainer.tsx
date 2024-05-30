import { Event } from '@/model/event'
import { Box, Image } from '@kuma-ui/core'
import EventLabel from './EventLabel'
import { Tournament } from '@/model/tournament'

interface EventContainerProps {
  sportEvents: Event[]
}

export default function EventsContainer({ sportEvents }: EventContainerProps) {
  const sportEventsGroupedByTournament = sportEvents.reduce((acc, event) => {
    if (!acc[event.tournament.id]) {
      acc[event.tournament.id] = []
    }
    acc[event.tournament.id].push(event)
    return acc
  }, {} as Record<number, Event[]>)

  const tournamentIds = Object.keys(sportEventsGroupedByTournament) as unknown as Tournament['id'][]

  return tournamentIds.map((tournamentId, idx) => (
    <Box key={tournamentId}>
      <Box display="flex" alignItems="center" paddingX="spacings.lg" paddingY="spacings.md" gap="32px">
        <Image
          src={`https://academy-backend.sofascore.dev/tournament/${tournamentId}/image`}
          alt={sportEventsGroupedByTournament[tournamentId][0].tournament.name}
          width={32}
          height={32}
        />
        <Box display="flex" alignItems="center">
          <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
            {sportEventsGroupedByTournament[tournamentId][0].tournament.country.name}
          </Box>
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_pointer_right.svg)"
            backgroundColor="colors.onSurface.lv2"
            width="24px"
            height="24px"
          ></Box>
          <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
            {sportEventsGroupedByTournament[tournamentId][0].tournament.name}
          </Box>
        </Box>
      </Box>
      <Box>
        {sportEventsGroupedByTournament[tournamentId].map(event => (
          <EventLabel event={event} key={event.id} />
        ))}
      </Box>

      {idx < tournamentIds.length - 1 ? (
        <Box height="1px" bg="colors.onSurface.lv4" marginTop="spacings.sm"></Box>
      ) : null}
    </Box>
  ))
}
