import { useDateContext } from '@/context/DateContext'
import { Event } from '@/model/event'
import { formatFullDateByLocale, getDateTimeByLocale, isoDateFormat } from '@/utils/date'
import { Box, Heading, Image } from '@kuma-ui/core'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import TrackEventButton from '../eventLabel/TrackEventButton'

interface EventDetailsHeadingProps {
  event: Event
}

export default function EventDetailsHeading({ event }: EventDetailsHeadingProps) {
  const [t] = useTranslation('global')

  const { dateLocale } = useDateContext()

  const todayDate = new Date()
  const tomorrowDate = new Date(todayDate)
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const yesterdayDate = new Date(todayDate)
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)
  const startDate = new Date(event.startDate)
  const startTime = getDateTimeByLocale(startDate, dateLocale)

  return (
    <>
      <Box padding="spacings.lg" display="flex" justifyContent="center">
        <TrackEventButton event={event} />
      </Box>
      <Box padding="spacings.lg" display="flex" justifyContent="space-between" gap="spacings.xl">
        <Box flex="1">
          <Link href={`/${event.tournament.sport.slug}/team/${event.homeTeam.id}`}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="spacings.sm"
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
        </Box>
        <Box flex="1" display="flex" flexDirection="column" alignItems="center" gap="spacings.xs">
          {event.status === 'notstarted' ? (
            <>
              <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.xs">
                {isoDateFormat(todayDate) === isoDateFormat(startDate)
                  ? t('eventDetailsHeading.today')
                  : isoDateFormat(tomorrowDate) === isoDateFormat(startDate)
                  ? t('eventDetailsHeading.tomorrow')
                  : isoDateFormat(yesterdayDate) === isoDateFormat(startDate)
                  ? t('eventDetailsHeading.yesterday')
                  : formatFullDateByLocale(startDate, dateLocale)}
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
                {t('eventDetailsHeading.fullTime')}
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
        <Box flex="1">
          <Link href={`/${event.tournament.sport.slug}/team/${event.awayTeam.id}`}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="spacings.sm"
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
      </Box>
    </>
  )
}
