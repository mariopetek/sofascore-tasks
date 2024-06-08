import { Event } from '@/model/event'
import { Box, Image } from '@kuma-ui/core'
import { Tournament } from '@/model/tournament'
import Separator from '@/components/Separator'
import Link from 'next/link'
import EventLabelButton from '../EventLabelButton'

interface SportEventContainerProps {
  events: Event[]
}

export default function SportEventsContainer({ events }: SportEventContainerProps) {
  const sportEventsGroupedByTournament = events.reduce((acc, event) => {
    if (!acc[event.tournament.id]) {
      acc[event.tournament.id] = []
    }
    acc[event.tournament.id].push(event)
    return acc
  }, {} as Record<Tournament['id'], Event[]>)

  const tournamentIds = Object.keys(sportEventsGroupedByTournament) as unknown as Tournament['id'][]

  return tournamentIds.map((tournamentId, idx) => (
    <Box key={tournamentId}>
      <Box display="flex" alignItems="center" paddingX="spacings.lg" paddingY="spacings.md" gap="spacings.xxxl">
        <Image
          src={`https://academy-backend.sofascore.dev/tournament/${tournamentId}/image`}
          alt={sportEventsGroupedByTournament[tournamentId][0].tournament.name}
          width="32px"
          height="32px"
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
          <Link
            href={`/${sportEventsGroupedByTournament[tournamentId][0].tournament.sport.slug}/tournament/${sportEventsGroupedByTournament[tournamentId][0].tournament.id}`}
          >
            <Box
              as="span"
              color="colors.onSurface.lv2"
              fontSize="fontSizes.sm"
              fontWeight="fontWeights.bold"
              _hover={{ color: 'colors.onSurface.lv3' }}
            >
              {sportEventsGroupedByTournament[tournamentId][0].tournament.name}
            </Box>
          </Link>
        </Box>
      </Box>
      <Box>
        {sportEventsGroupedByTournament[tournamentId].map(event => (
          <EventLabelButton event={event} key={event.id} />
        ))}
      </Box>

      {idx < tournamentIds.length - 1 ? (
        <Box marginTop="spacings.sm">
          <Separator />
        </Box>
      ) : null}
    </Box>
  ))
}
