import ImagePlaceholder from '@/components/ImagePlaceholder'
import Separator from '@/components/Separator'
import { Player } from '@/model/player'
import { TeamDetails } from '@/model/team'
import { Box, Heading } from '@kuma-ui/core'

interface TeamInfoPanelProps {
  team: TeamDetails
  players: Player[]
}

export default function TeamInfoPanel({ team, players }: TeamInfoPanelProps) {
  const playersCount = players.length

  const foreignPlayersCount = players.filter(player => player.country.id !== team.country.id).length

  const foreignPlayersPercentage = foreignPlayersCount / playersCount
  return (
    <Box
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
      paddingBottom="spacings.xxl"
    >
      <Heading
        as="h2"
        paddingX="spacings.xxxl"
        paddingTop="spacings.lg"
        paddingBottom="spacings.md"
        textAlign="center"
        fontSize="fontSizes.md"
        fontWeight="bold"
        color="colors.onSurface.lv1"
      >
        Team Info
      </Heading>
      <Box paddingX="spacings.lg" paddingY="spacings.sm" display="flex" alignItems="center" gap="spacings.lg">
        <ImagePlaceholder width="40px" height="40px" />
        <Box as="span" fontSize="fontSizes.sm" color="colors.onSurface.lv1">
          Coach: {team.managerName}
        </Box>
      </Box>
      <Box marginTop="spacings.sm">
        <Separator />
      </Box>
      <Box display="flex">
        <Box
          paddingX="spacings.md"
          paddingY="spacings.sm"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="spacings.md"
          flex="1"
        >
          <Box
            maskSize="40px 40px"
            maskImage="url(/icons/system/ic_team.svg)"
            backgroundColor="colors.primary.default"
            width="40px"
            height="40px"
          ></Box>
          <Box color="colors.primary.default" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
            {playersCount}
          </Box>
          <Box color="colors.onSurface.lv2" fontSize="fontSizes.xs" paddingY="spacings.sm">
            Total Players
          </Box>
        </Box>
        <Box
          paddingX="spacings.md"
          paddingY="spacings.sm"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="spacings.sm"
          flex="1"
        >
          <Box width="40px" height="40px" display="flex" justifyContent="center" alignItems="center">
            <Box
              height="32px"
              width="32px"
              borderRadius="50%"
              bg={`conic-gradient(var(--primary-default) ${Math.round(
                foreignPlayersPercentage * 100
              )}%, var(--secondary-default) 0%)`}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="22px" height="22px" borderRadius="50%" bg="colors.surface.s1"></Box>
            </Box>
          </Box>
          <Box color="colors.primary.default" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
            {foreignPlayersCount}
          </Box>
          <Box color="colors.onSurface.lv2" fontSize="fontSizes.xs" paddingY="spacings.sm">
            Foreign Players
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
