import { Event } from '@/model/event'
import Link from 'next/link'
import EventLabel from './EventLabel'
import { Box } from '@kuma-ui/core'

interface EventLabelLinkProps {
  event: Event
}

export default function EventLabelLink({ event }: EventLabelLinkProps) {
  return (
    <Link href={`/${event.tournament.sport.slug}/tournament/${event.tournament.id}/event/${event.id}`}>
      <Box _hover={{ bg: 'colors.surface.s2' }}>
        <EventLabel event={event} />
      </Box>
    </Link>
  )
}
