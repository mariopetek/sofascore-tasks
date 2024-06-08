import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Box, Button } from '@kuma-ui/core'
import Link from 'next/link'

export default function EventDetailsWidget() {
  const { selectedEvent, setSelectedEvent, isDetailsPanelOpen, setIsDetailsPanelOpen } = useEventDetailsContext()

  function handleCloseEventClick() {
    setIsDetailsPanelOpen(false)
    setSelectedEvent(null)
  }

  return !isDetailsPanelOpen ? null : (
    <Box
      backgroundColor="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
      maxWidth="448px"
      width="100%"
    >
      <Box display="flex" justifyContent="space-between" padding="spacings.lg">
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
          <Box display="flex" alignItems="center">
            <Box color="colors.primary.default" fontSize="fontSizes.md" fontWeight="fontWeights.bold">
              View Full Page
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
      <Box padding="spacings.lg"></Box>
      <Box></Box>
    </Box>
  )
}
