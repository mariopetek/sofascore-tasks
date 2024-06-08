import { Event } from '@/model/event'
import { isoDateFormat } from '@/utils/date'
import { Box, Heading, Image } from '@kuma-ui/core'
import Link from 'next/link'

interface EventDetailsHeadingProps {
  event: Event
}

export default function EventDetailsHeading({ event }: EventDetailsHeadingProps) {
  const todayDate = new Date()
  const tommorowDate = new Date(todayDate)
  tommorowDate.setDate(tommorowDate.getDate() + 1)
  const startDate = new Date(event.startDate)
  const startTime = startDate.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })

  return (
    <Box padding="spacings.lg" display="flex" justifyContent="space-between">
      <Link href={`/${event.tournament.sport.slug}/team/${event.homeTeam.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="spacings.sm"
          width="96px"
          textAlign="center"
          color="colors.onSurface.lv1"
          _hover={{ color: 'colors.onSurface.lv2' }}
        >
          <Image
            src={`https://academy-backend.sofascore.dev/team/${event.homeTeam.id}/image`}
            width="40px"
            height="40px"
          />
          <Box as="span" fontWeight="fontWeights.bold" fontSize="fontSizes.xs">
            {event.homeTeam.name}
          </Box>
        </Box>
      </Link>
      <Box flex="1" display="flex" flexDirection="column" alignItems="center" gap="spacings.xs">
        {event.status === 'notstarted' ? (
          <>
            <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.xs">
              {isoDateFormat(todayDate) === isoDateFormat(startDate)
                ? 'Today'
                : isoDateFormat(tommorowDate) === isoDateFormat(startDate)
                ? 'Tommorow'
                : isoDateFormat(startDate)}
            </Box>
            <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.xs">
              {startTime}
            </Box>
          </>
        ) : null}
        {event.status === 'finished' ? (
          <>
            <Heading as="h1" fontSize="fontSizes.xxl" display="flex" gap="spacings.xs">
              <Box
                as="span"
                color={
                  event.homeScore.total! > event.awayScore.total! ? 'colors.onSurface.lv1' : 'colors.onSurface.lv2'
                }
              >
                {event.homeScore.total}
              </Box>
              <Box as="span" color="colors.onSurface.lv2">
                -
              </Box>
              <Box
                as="span"
                color={
                  event.awayScore.total! > event.homeScore.total! ? 'colors.onSurface.lv1' : 'colors.onSurface.lv2'
                }
              >
                {event.awayScore.total}
              </Box>
            </Heading>
            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs">
              Full Time
            </Box>
          </>
        ) : null}
        {event.status === 'inprogress' ? (
          <>
            <Heading as="h1" fontSize="fontSizes.xxl" display="flex" gap="spacings.xs" color="colors.live">
              <Box as="span">{event.homeScore.total}</Box>
              <Box as="span" color="colors.live">
                -
              </Box>
              <Box as="span">{event.awayScore.total}</Box>
            </Heading>
            <Box as="span" color="colors.live" fontSize="fontSizes.xs">
              {event.status}
            </Box>
          </>
        ) : null}
      </Box>
      <Link href={`/${event.tournament.sport.slug}/team/${event.awayTeam.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="spacings.sm"
          width="96px"
          textAlign="center"
          color="colors.onSurface.lv1"
          _hover={{ color: 'colors.onSurface.lv2' }}
        >
          <Image
            src={`https://academy-backend.sofascore.dev/team/${event.awayTeam.id}/image`}
            width="40px"
            height="40px"
          />
          <Box as="span" fontWeight="fontWeights.bold" fontSize="fontSizes.xs">
            {event.awayTeam.name}
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
