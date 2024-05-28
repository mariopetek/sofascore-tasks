import { Box, Button } from '@kuma-ui/core'
import { useState } from 'react'
import { formatDate, formatDateWithNoSpaces, getDatesAroundToday } from '@/utils/date'

export default function EventsPanel() {
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()))
  const datesAroundToday = getDatesAroundToday(3)

  return (
    <Box
      backgroundColor="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
      maxWidth="448px"
      width="100%"
      height="100%"
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
        <Button>L</Button>
        {datesAroundToday.map(date => (
          <Box
            key={date}
            color="colors.surface.s1"
            cursor="pointer"
            onClick={() => setCurrentDate(date)}
            position="relative"
          >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Box as="span" fontSize="fontSizes.xs" fontWeight="fontWeights.normal">
                {new Date(date).toDateString() === new Date().toDateString()
                  ? 'TODAY'
                  : new Date(date).toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
              </Box>
              <Box as="span" fontSize="fontSizes.xs">
                {formatDateWithNoSpaces(new Date(date))}
              </Box>
            </Box>
            {currentDate === date && (
              <Box
                height="4px"
                width="100%"
                backgroundColor="colors.surface.s1"
                position="absolute"
                bottom="0"
                borderRadius="2px 2px 0 0"
              />
            )}
          </Box>
        ))}
        <Button>R</Button>
      </Box>
    </Box>
  )
}
