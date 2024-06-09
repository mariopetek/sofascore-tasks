import { Event } from '@/model/event'
import { Box, Button } from '@kuma-ui/core'
import EventLabelButton from './EventLabelButton'
import ErrorMessage from '@/components/ErrorMessage'
import Loader from '@/components/Loader'
import { useTranslation } from 'react-i18next'

interface EventsPanelRoundsProps {
  events: Event[] | undefined
  eventsLoading: boolean
  eventsError: any
  previousEvents: Event[] | undefined
  nextEvents: Event[] | undefined
  span: 'last' | 'next'
  setSpan: React.Dispatch<React.SetStateAction<'last' | 'next'>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function EventsPanelRounds({
  events,
  eventsLoading,
  eventsError,
  previousEvents,
  nextEvents,
  span,
  setSpan,
  page,
  setPage,
}: EventsPanelRoundsProps) {
  const [t] = useTranslation('global')

  const groupedEventsByRound = events?.reduce((acc, event) => {
    if (!acc[event.round]) {
      acc[event.round] = []
    }
    acc[event.round].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  function handleLeftButtonClick() {
    if (span === 'next') {
      if (page === 0) {
        setSpan('last')
      } else {
        setPage(page - 1)
      }
    } else {
      setPage(page + 1)
    }
  }

  function handleRightButtonClick() {
    if (span === 'next') {
      setPage(page + 1)
    } else {
      if (page === 0) {
        setSpan('next')
      } else {
        setPage(page - 1)
      }
    }
  }

  const rounds = groupedEventsByRound && Object.keys(groupedEventsByRound)

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        paddingX="spacings.lg"
        paddingY="spacings.xs"
        justifyContent="space-between"
      >
        <Button
          borderStyle="solid"
          borderRadius="radii.xs"
          borderColor="colors.primary.default"
          borderWidth="2px solid"
          bg="none"
          paddingX="spacings.lg"
          paddingY="spacings.sm"
          onClick={handleLeftButtonClick}
          visibility={previousEvents?.length === 0 ? 'hidden' : 'visible'}
        >
          <Box
            maskSize="24px 24px"
            maskImage="url(/icons/system/ic_chevron_left.svg)"
            backgroundColor="colors.primary.default"
            width="24px"
            height="24px"
          ></Box>
        </Button>
        <Box as="span" color="colors.onSurface.lv1" fontWeight="fontWeights.bold">
          {t('eventsPanelRounds.matches')}
        </Box>
        <Button
          borderStyle="solid"
          borderRadius="radii.xs"
          borderColor="colors.primary.default"
          borderWidth="2px"
          bg="colors.surface.s1"
          paddingX="spacings.lg"
          paddingY="spacings.sm"
          onClick={handleRightButtonClick}
          visibility={nextEvents?.length === 0 ? 'hidden' : 'visible'}
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
      {rounds
        ? rounds.map(round => (
            <Box key={round}>
              <Box
                paddingX="spacings.lg"
                paddingBottom="spacings.sm"
                paddingTop="spacings.xl"
                fontSize="fontSizes.xs"
                fontWeight="fontWeights.bold"
                color="colors.onSurface.lv1"
              >
                {t('eventsPanelRounds.round')} {round}
              </Box>
              {groupedEventsByRound[round].map(event => (
                <EventLabelButton key={event.id} event={event} />
              ))}
            </Box>
          ))
        : null}
      {eventsLoading ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <Loader />
        </Box>
      ) : null}
      {eventsError ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <ErrorMessage message="Failed to load standings" />
        </Box>
      ) : null}
    </>
  )
}
