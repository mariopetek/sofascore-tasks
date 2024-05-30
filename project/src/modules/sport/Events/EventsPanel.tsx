import { Box, Button } from '@kuma-ui/core'
import { useEffect, useState } from 'react'
import { formatDateWithDashes, formatDateWithDayAndMonth, getDatesAroundToday } from '@/utils/date'
import { getSportEventsByDate } from '@/api/sport'
import EventsContainer from './EventsContainer'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'

interface EventsPanelProps {
  sportSlug: string
}

export default function EventsPanel({ sportSlug }: EventsPanelProps) {
  const [selectedDate, setSelectedDate] = useState(formatDateWithDashes(new Date()))
  const datesAroundToday = getDatesAroundToday(3)

  const { sportEvents, sportEventsError, sportEventsLoading } = getSportEventsByDate(sportSlug, new Date(selectedDate))
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
    >
      <Box
        height="48px"
        bg="colors.primary.variant"
        borderTopLeftRadius="radii.lg"
        borderTopRightRadius="radii.lg"
        paddingTop="spacings.sm"
        display="flex"
        gap="spacings.sm"
        justifyContent="space-evenly"
      >
        <Button
          height="32px"
          width="32px"
          bg="colors.surface.s1"
          borderRadius="radii.xs"
          border="none"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            setSelectedDate(currentSelected => {
              const currentIndex = datesAroundToday.indexOf(currentSelected)
              if (currentIndex === 0) return currentSelected
              return datesAroundToday[currentIndex - 1]
            })
          }}
        >
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_chevron_left.svg)"
            backgroundColor="colors.primary.default"
            width="24px"
            height="24px"
          ></Box>
        </Button>
        {datesAroundToday.map(date => (
          <Box
            key={date}
            color="colors.surface.s1"
            cursor="pointer"
            onClick={() => setSelectedDate(date)}
            position="relative"
          >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Box as="span" fontSize="fontSizes.xs" fontWeight="fontWeights.normal">
                {new Date(date).toDateString() === new Date().toDateString()
                  ? 'TODAY'
                  : new Date(date).toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
              </Box>
              <Box as="span" fontSize="fontSizes.xs">
                {formatDateWithDayAndMonth(new Date(date))}
              </Box>
            </Box>
            {selectedDate === date && (
              <Box
                height="4px"
                width="100%"
                backgroundColor="colors.surface.s1"
                position="absolute"
                bottom="0"
                borderTopLeftRadius="radii.xs"
                borderTopRightRadius="radii.xs"
              />
            )}
          </Box>
        ))}
        <Button
          height="32px"
          width="32px"
          bg="colors.surface.s1"
          borderRadius="radii.xs"
          border="none"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            setSelectedDate(currentSelected => {
              const currentIndex = datesAroundToday.indexOf(currentSelected)
              if (currentIndex === datesAroundToday.length - 1) return currentSelected
              return datesAroundToday[currentIndex + 1]
            })
          }}
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

      {sportEventsLoading ? (
        <Box flex="1" display="flex" justifyContent="center" alignItems="center" padding="spacings.lg">
          <Loader />
        </Box>
      ) : sportEvents ? (
        <Box paddingY="spacings.xl">
          <Box display="flex" justifyContent="space-between" paddingX="spacings.lg">
            <Box fontSize="fontSizes.xs" fontWeight="fontWeights.bold" color="colors.onSurface.lv1">
              {new Date(selectedDate).toDateString() === new Date().toDateString()
                ? 'Today'
                : new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' })}
            </Box>
            <Box fontSize="fontSizes.xs" fontWeight="fontWeights.bold" color="colors.onSurface.lv2">
              {sportEvents.length} {sportEvents.length === 1 ? 'Event' : 'Events'}
            </Box>
          </Box>
          <EventsContainer sportEvents={sportEvents} />
        </Box>
      ) : null}
      {!sportEvents && sportEventsError ? (
        <Box flex="1" display="flex" justifyContent="center" alignItems="center" padding="spacings.lg">
          <ErrorMessage message="Error loading events" />
        </Box>
      ) : null}
    </Box>
  )
}
