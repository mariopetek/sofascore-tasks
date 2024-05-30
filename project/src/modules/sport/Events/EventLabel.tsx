import { useEventDetailsContext } from '@/context/EventDetailsContext'
import { Event } from '@/model/event'
import { formatDateWithDayMonthAndYear } from '@/utils/date'
import { Box } from '@kuma-ui/core'

interface EventLabelProps {
  event: Event
}

export default function EventLabel({ event }: EventLabelProps) {
  const { setSelectedEventId, setIsDetailsPanelOpen } = useEventDetailsContext()

  const startTime = new Date(event.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })
  const startDate = new Date(event.startDate)

  const homeTeamName = event.homeTeam.name
  const awayTeamName = event.awayTeam.name

  const homeTeamScore = event.homeScore.total
  const awayTeamScore = event.awayScore.total

  const eventStatus = event.status

  function handleEventClick() {
    setIsDetailsPanelOpen(true)
    setSelectedEventId(event.id)
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingY="10px"
      cursor="pointer"
      onClick={handleEventClick}
    >
      <Box display="flex" gap="spacings.lg">
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
          <Box color="colors.onSurface.lv2" fontSize="fontSizes.xs">
            {startDate.toDateString() !== new Date().toDateString() && eventStatus === 'notstarted'
              ? formatDateWithDayMonthAndYear(startDate)
              : startTime}
          </Box>
          <Box color="colors.onSurface.lv2" fontSize="fontSizes.xs">
            {eventStatus === 'finished'
              ? 'FT'
              : startDate.toDateString() !== new Date().toDateString() && eventStatus === 'notstarted'
              ? startTime
              : eventStatus === 'notstarted'
              ? '-'
              : eventStatus}
          </Box>
        </Box>
        <Box width="1px" bg="colors.onSurface.lv4"></Box>
        <Box>
          <Box
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
          <Box
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
      <Box>
        <Box
          color={
            homeTeamScore !== undefined && awayTeamScore !== undefined
              ? homeTeamScore > awayTeamScore
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
              ? awayTeamScore > homeTeamScore
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
