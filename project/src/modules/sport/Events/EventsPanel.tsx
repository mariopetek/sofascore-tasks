import { Box, Button } from '@kuma-ui/core'
import { datesAroundDate, europeanDayMonthDateFormat, isoDateFormat } from '@/utils/date'
import EventsContainer from './EventsContainer'
import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Sport } from '@/model/sport'

interface EventsPanelProps {
  events: Event[]
  selectedDate: string
  sportSlug: Sport['slug']
}

export default function EventsPanel({ events, selectedDate, sportSlug }: EventsPanelProps) {
  const { setSelectedEventId, setIsDetailsPanelOpen } = useEventDetailsContext()
  const pathname = usePathname()
  const pathnameSegments = pathname.split('/').filter(Boolean)
  const firstPathnameSegment = pathnameSegments[0]

  useEffect(() => {
    setSelectedEventId(null)
    setIsDetailsPanelOpen(false)
  }, [selectedDate, sportSlug])

  const datesAroundSelectedDate = datesAroundDate(new Date(selectedDate), 3)

  const nextDate = new Date(selectedDate)
  nextDate.setDate(nextDate.getDate() + 1)

  const previousDate = new Date(selectedDate)
  previousDate.setDate(previousDate.getDate() - 1)

  const todayDate = new Date()

  return (
    <Box
      backgroundColor="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
      maxWidth="448px"
      width="100%"
      minHeight="448px"
      display="flex"
      flexDirection="column"
      paddingBottom="spacings.lg"
    >
      <Box
        height="48px"
        bg="colors.primary.variant"
        borderTopLeftRadius="radii.lg"
        borderTopRightRadius="radii.lg"
        paddingTop="spacings.sm"
        paddingX="spacings.sm"
        display="flex"
        gap="spacings.sm"
      >
        <Link href={`/${firstPathnameSegment}/${isoDateFormat(previousDate)}`}>
          <Box
            height="32px"
            width="32px"
            bg="colors.surface.s1"
            borderRadius="radii.xs"
            border="none"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              maskSize="24px 24px"
              maskImage="url(/icons/system/ic_chevron_left.svg)"
              backgroundColor="colors.primary.default"
              width="24px"
              height="24px"
            ></Box>
          </Box>
        </Link>

        <Box display="flex" flex="1" justifyContent="space-between" overflowX="hidden" overflowY="hidden">
          {datesAroundSelectedDate.map(date => (
            <Link key={date} href={`/${firstPathnameSegment}/${date}`}>
              <Box color="colors.surface.s1" position="relative" height="100%">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <Box as="span" fontSize="fontSizes.xs" fontWeight="fontWeights.normal">
                    {isoDateFormat(new Date(date)) === isoDateFormat(todayDate)
                      ? 'TODAY'
                      : new Date(date).toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
                  </Box>
                  <Box as="span" fontSize="fontSizes.xs">
                    {europeanDayMonthDateFormat(new Date(date))}
                  </Box>
                </Box>
                {isoDateFormat(new Date(selectedDate)) === date ? (
                  <Box
                    height="4px"
                    width="100%"
                    backgroundColor="colors.surface.s1"
                    position="absolute"
                    bottom="0"
                    borderTopLeftRadius="radii.xs"
                    borderTopRightRadius="radii.xs"
                  ></Box>
                ) : null}
              </Box>
            </Link>
          ))}
        </Box>
        <Link href={`/${firstPathnameSegment}/${isoDateFormat(nextDate)}`}>
          <Box
            height="32px"
            width="32px"
            bg="colors.surface.s1"
            borderRadius="radii.xs"
            border="none"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              maskSize="24px 24px"
              maskImage="url(/icons/system/ic_chevron_right.svg)"
              backgroundColor="colors.primary.default"
              width="24px"
              height="24px"
            ></Box>
          </Box>
        </Link>
      </Box>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          paddingX="spacings.lg"
          paddingTop="spacings.xl"
          paddingBottom="spacings.sm"
        >
          <Box fontSize="fontSizes.xs" fontWeight="fontWeights.bold" color="colors.onSurface.lv1">
            {isoDateFormat(new Date(selectedDate)) === isoDateFormat(new Date())
              ? 'Today'
              : new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' })}
          </Box>
          <Box fontSize="fontSizes.xs" fontWeight="fontWeights.bold" color="colors.onSurface.lv2">
            {events.length} {events.length === 1 ? 'Event' : 'Events'}
          </Box>
        </Box>
        <EventsContainer events={events} />
      </Box>
    </Box>
  )
}
