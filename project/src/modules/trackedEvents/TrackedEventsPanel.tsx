import { useTrackedEventsContext } from '@/context/TrackedEventsContext'
import { Box } from '@kuma-ui/core'
import React, { useEffect, useState } from 'react'
import { Sport } from '@/model/sport'
import { isoDateFormat } from '@/utils/date'
import { Event } from '@/model/event'
import { useTranslation } from 'react-i18next'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useEventDetailsContext } from '@/context/EventDetailsContext'
import StyledPanel from '../styledComponents/StyledPanel'
import EventLabelLink from '../eventLabel/EventLabelLink'
import EventLabelButton from '../eventLabel/EventLabelButton'

interface TrackedEventsPanelProps {
  sportSlug: Sport['slug']
}
export default function TrackedEventsPanel({ sportSlug }: TrackedEventsPanelProps) {
  const [t] = useTranslation('global')

  const windowWidth = useWindowResize()

  const { events } = useTrackedEventsContext()
  const sportEvents = events.filter(event => event.tournament.sport.slug === sportSlug)

  type Page = 'previous' | 'current' | 'next'

  const [page, setPage] = useState<Page>('current')

  const { setIsDetailsPanelOpen, setSelectedEvent } = useEventDetailsContext()

  useEffect(() => {
    setIsDetailsPanelOpen(false)
    setSelectedEvent(null)
  }, [page])

  const todayDate = new Date()
  const tommorowDate = new Date()
  tommorowDate.setDate(todayDate.getDate() + 1)

  const groupedEventsByPage =
    sportEvents.length > 0
      ? sportEvents.reduce((acc, event) => {
          if (!acc['current']) {
            acc['current'] = []
          }
          if (!acc['previous']) {
            acc['previous'] = []
          }
          if (!acc['next']) {
            acc['next'] = []
          }
          if (
            isoDateFormat(new Date(event.startDate)) === isoDateFormat(todayDate) ||
            isoDateFormat(new Date(event.startDate)) === isoDateFormat(tommorowDate)
          ) {
            acc['current'].push(event)
          } else if (
            new Date(isoDateFormat(new Date(event.startDate))).getTime() < new Date(isoDateFormat(todayDate)).getTime()
          ) {
            acc['previous'].push(event)
          } else {
            acc['next'].push(event)
          }
          return acc
        }, {} as Record<Page, Event[]>)
      : { current: [], previous: [], next: [] }

  return (
    <StyledPanel>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center" paddingX="spacings.sm">
          <Box as="h2" color="colors.onSurface.lv1" fontSize="fontSizes.md" fontWeight="fontWeights.bold">
            {t('trackedEventsPanel.trackedEvents')}
          </Box>
        </Box>
        <Box display="flex" paddingY="spacings.lg" paddingX="spacings.sm" gap="spacings.xl">
          <Box flex="1" display="flex" justifyContent="flex-end">
            <Box
              cursor="pointer"
              onClick={() => setPage('previous')}
              paddingX="spacings.lg"
              paddingY="spacings.sm"
              color={page === 'previous' ? 'colors.surface.s1' : 'colors.primary.default'}
              bg={page === 'previous' ? 'colors.primary.default' : 'colors.surface.s1'}
              borderWidth="2px"
              borderStyle="solid"
              borderColor="colors.primary.default"
              borderRadius="radii.xs"
              fontSize="fontSizes.md"
              fontWeight="fontWeights.bold"
            >
              {t('trackedEventsPanel.previous')}
            </Box>
          </Box>
          <Box flex="1" display="flex" justifyContent="center">
            <Box
              onClick={() => setPage('current')}
              cursor="pointer"
              paddingX="spacings.lg"
              paddingY="spacings.sm"
              color={page === 'current' ? 'colors.surface.s1' : 'colors.primary.default'}
              bg={page === 'current' ? 'colors.primary.default' : 'colors.surface.s1'}
              borderWidth="2px"
              borderStyle="solid"
              borderColor="colors.primary.default"
              borderRadius="radii.xs"
              fontSize="fontSizes.md"
              fontWeight="fontWeights.bold"
            >
              {t('trackedEventsPanel.current')}
            </Box>
          </Box>
          <Box flex="1" display="flex">
            <Box
              onClick={() => setPage('next')}
              cursor="pointer"
              paddingX="spacings.lg"
              paddingY="spacings.sm"
              color={page === 'next' ? 'colors.surface.s1' : 'colors.primary.default'}
              bg={page === 'next' ? 'colors.primary.default' : 'colors.surface.s1'}
              borderWidth="2px"
              borderStyle="solid"
              borderColor="colors.primary.default"
              borderRadius="radii.xs"
              fontSize="fontSizes.md"
              fontWeight="fontWeights.bold"
            >
              {t('trackedEventsPanel.next')}
            </Box>
          </Box>
        </Box>
      </Box>
      {groupedEventsByPage[page].length === 0 ? (
        <Box paddingX="spacings.sm">
          <Box
            padding="spacings.lg"
            bg="colors.surface.s2"
            borderRadius="radii.md"
            display="flex"
            justifyContent="center"
          >
            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.sm">
              {t('trackedEventsPanel.noTrackedEvents')}
            </Box>
          </Box>
        </Box>
      ) : (
        groupedEventsByPage[page].map(event =>
          windowWidth <= 1200 ? (
            <EventLabelLink event={event} key={event.id} />
          ) : (
            <EventLabelButton event={event} key={event.id} />
          )
        )
      )}
    </StyledPanel>
  )
}
