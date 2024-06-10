import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Box, Button } from '@kuma-ui/core'
import Link from 'next/link'
import EventDetailsHeading from './EventDetailsHeading'
import Separator from '@/components/Separator'
import EventIncidentsWrapper from './EventIncidentsWrapper'
import { useTranslation } from 'react-i18next'
import StyledPanel from '../styledComponents/StyledPanel'

export default function EventDetailsWidget() {
  const [t] = useTranslation('global')

  const { selectedEvent, setSelectedEvent, isDetailsPanelOpen, setIsDetailsPanelOpen } = useEventDetailsContext()

  function handleCloseEventClick() {
    setIsDetailsPanelOpen(false)
    setSelectedEvent(null)
  }

  return !isDetailsPanelOpen ? null : (
    <StyledPanel>
      <Box display="flex" justifyContent="space-between" paddingX="spacings.lg" gap="spacings.lg">
        <Button
          maskSize="24px 24px"
          maskImage="url(/icons/system/ic_close.svg)"
          backgroundColor="colors.onSurface.lv1"
          width="24px"
          height="24px"
          onClick={handleCloseEventClick}
        ></Button>
        <Link
          href={`/${selectedEvent?.tournament.sport.slug}/tournament/${selectedEvent?.tournament.id}/event/${selectedEvent?.id}`}
        >
          <Box display="flex" alignItems="center" width="max-content">
            <Box color="colors.primary.default" fontSize="fontSizes.md" fontWeight="fontWeights.bold" textAlign="end">
              {t('eventDetailsWidget.viewFullPage')}
            </Box>
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
      {selectedEvent === null ? null : (
        <>
          <EventDetailsHeading event={selectedEvent} />
          <Separator />
          <EventIncidentsWrapper event={selectedEvent} />
        </>
      )}
    </StyledPanel>
  )
}
