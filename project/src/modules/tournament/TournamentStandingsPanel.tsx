import { Box } from '@kuma-ui/core'

export default function TournamentStandingsPanel() {
  return (
    <Box
      maxWidth="920px"
      width="100%"
      borderRadius="radii.lg"
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      paddingBottom="spacings.lg"
      fontSize="fontSizes.sm"
    >
      <Box padding="spacings.lg" display="flex" justifyContent="space-between" color="colors.onSurface.lv2">
        <Box display="flex" alignItems="center" gap="spacings.lg" flex="2">
          <Box as="span">#</Box>
          <Box as="span">Team</Box>
        </Box>
        <Box flex="3" display="flex" justifyContent="space-between">
          <Box as="span">P</Box>
          <Box as="span">W</Box>
          <Box as="span">D</Box>
          <Box as="span">L</Box>
          <Box as="span">Goals</Box>
          <Box as="span">PTS</Box>
        </Box>
      </Box>
    </Box>
  )
}
