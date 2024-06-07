import { Player } from '@/model/player'
import { Box, Heading } from '@kuma-ui/core'
import TeamPlayerLabel from './TeamPlayerLabel'
import ImagePlaceholder from '../ImagePlaceholder'
import Separator from '../Separator'
import { Fragment } from 'react'
import { TeamDetails } from '@/model/team'
import { Sport } from '@/model/sport'

interface TeamSquadPanelProps {
  players: Player[]
  teamDetails: TeamDetails
  sportSlug: Sport['slug']
}

export default function TeamSquadPanel({ players, teamDetails, sportSlug }: TeamSquadPanelProps) {
  return (
    <Box
      bg="colors.surface.s1"
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      borderRadius="radii.lg"
      paddingBottom="spacings.lg"
    >
      <Heading
        as="h2"
        fontSize="fontSizes.xs"
        fontWeight="fontWeights.bold"
        paddingX="spacings.lg"
        paddingBottom="spacings.sm"
        paddingTop="spacings.xl"
        color="colors.onSurface.lv1"
      >
        Coach
      </Heading>
      <Box paddingY="spacings.sm" paddingX="spacings.lg" display="flex" alignItems="center" gap="spacings.lg">
        <ImagePlaceholder />
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
          {teamDetails.managerName}
        </Box>
      </Box>
      <Separator />
      <Heading
        as="h2"
        fontSize="fontSizes.xs"
        fontWeight="fontWeights.bold"
        paddingX="spacings.lg"
        paddingBottom="spacings.sm"
        paddingTop="spacings.xl"
        color="colors.onSurface.lv1"
      >
        Players
      </Heading>
      {players.map((player, index) => (
        <Fragment key={player.id}>
          <TeamPlayerLabel key={player.id} player={player} sportSlug={sportSlug} teamId={teamDetails.id} />
          {index !== players.length - 1 ? <Separator /> : null}
        </Fragment>
      ))}
    </Box>
  )
}
