import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import { europeanDateFormat, isoDateFormat } from '@/utils/date'
import { Box, Image } from '@kuma-ui/core'

interface EventLabelProps {
  event: Event
}

export default function EventLabel({ event }: EventLabelProps) {
  const { selectedEventId, setSelectedEventId, setIsDetailsPanelOpen } = useEventDetailsContext()

  const startTime = new Date(event.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })
  const startDate = new Date(event.startDate)

  const homeTeamLogo = `https://academy-backend.sofascore.dev/team/${event.homeTeam.id}/image`
  const awayTeamLogo = `https://academy-backend.sofascore.dev/team/${event.awayTeam.id}/image`

  const homeTeamName = event.homeTeam.name
  const awayTeamName = event.awayTeam.name

  const homeTeamScore = event.homeScore.total
  const awayTeamScore = event.awayScore.total

  const eventStatus = event.status

  function handleEventClick() {
    setIsDetailsPanelOpen(true)
    setSelectedEventId(event.id)
  }

  const isActive = () => selectedEventId === event.id

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingY="spacings.sm"
      paddingX="spacings.lg"
      cursor="pointer"
      onClick={handleEventClick}
      bg={isActive() ? 'colors.primary.highlight' : 'colors.surface.s1'}
      _hover={{ bg: isActive() ? 'colors.primary.highlight' : 'colors.surface.s2' }}
    >
      <Box display="flex" gap="spacings.lg">
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
          <Box color="colors.onSurface.lv2" fontSize="fontSizes.xs">
            {isoDateFormat(startDate) !== isoDateFormat(new Date()) && eventStatus === 'notstarted'
              ? europeanDateFormat(startDate)
              : startTime}
          </Box>
          <Box color={eventStatus === 'live' ? 'colors.live' : 'colors.onSurface.lv2'} fontSize="fontSizes.xs">
            {eventStatus === 'finished'
              ? 'FT'
              : isoDateFormat(startDate) !== isoDateFormat(new Date()) && eventStatus === 'notstarted'
              ? startTime
              : eventStatus === 'notstarted'
              ? '-'
              : eventStatus}
          </Box>
        </Box>
        <Box width="1px" bg="colors.onSurface.lv4"></Box>
        <Box display="flex" flexDirection="column" gap="spacings.xs">
          <Box display="flex" alignItems="center" gap="spacings.sm">
            <Image src={homeTeamLogo} alt={homeTeamName} width={16} height={16} />
            <Box
              as="span"
              fontSize="fontSizes.sm"
              color={
                homeTeamScore !== undefined && awayTeamScore !== undefined
                  ? homeTeamScore > awayTeamScore
                    ? 'colors.onSurface.lv1'
                    : 'colors.onSurface.lv2'
                  : 'colors.onSurface.lv1'
              }
            >
              {homeTeamName}
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap="spacings.sm">
            <Image src={awayTeamLogo} alt={awayTeamName} width={16} height={16} />
            <Box
              as="span"
              fontSize="fontSizes.sm"
              color={
                awayTeamScore !== undefined && homeTeamScore !== undefined
                  ? awayTeamScore > homeTeamScore
                    ? 'colors.onSurface.lv1'
                    : 'colors.onSurface.lv2'
                  : 'colors.onSurface.lv1'
              }
            >
              {awayTeamName}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box
          color={
            homeTeamScore !== undefined && awayTeamScore !== undefined
              ? eventStatus === 'live'
                ? 'colors.live'
                : homeTeamScore > awayTeamScore
                ? 'colors.onSurface.lv1'
                : 'colors.onSurface.lv2'
              : 'colors.onSurface.lv1'
          }
          textAlign="right"
        >
          {homeTeamScore}
        </Box>
        <Box
          color={
            awayTeamScore !== undefined && homeTeamScore !== undefined
              ? eventStatus === 'live'
                ? 'colors.live'
                : awayTeamScore > homeTeamScore
                ? 'colors.onSurface.lv1'
                : 'colors.onSurface.lv2'
              : 'colors.onSurface.lv1'
          }
          textAlign="right"
        >
          {awayTeamScore}
        </Box>
      </Box>
    </Box>
  )
}
