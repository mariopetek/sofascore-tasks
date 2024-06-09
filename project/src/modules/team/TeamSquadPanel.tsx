import { Player } from '@/model/player'
import { Box, Heading } from '@kuma-ui/core'
import TeamPlayerLabel from './TeamPlayerLabel'
import ImagePlaceholder from '../../components/ImagePlaceholder'
import Separator from '../../components/Separator'
import { Fragment } from 'react'
import { TeamDetails } from '@/model/team'
import { Sport } from '@/model/sport'
import { useTranslation } from 'react-i18next'

interface TeamSquadPanelProps {
  players: Player[]
  teamDetails: TeamDetails
  sportSlug: Sport['slug']
}

export default function TeamSquadPanel({ players, teamDetails, sportSlug }: TeamSquadPanelProps) {
  const [t] = useTranslation('global')

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
        {t('teamSquadPanel.coach')}
      </Heading>
      <Box paddingY="spacings.sm" paddingX="spacings.lg" display="flex" alignItems="center" gap="spacings.lg">
        <ImagePlaceholder width="40px" height="40px" />
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
          {teamDetails.managerName}
        </Box>
      </Box>
      <Box marginTop="spacings.sm">
        <Separator />
      </Box>
      <Heading
        as="h2"
        fontSize="fontSizes.xs"
        fontWeight="fontWeights.bold"
        paddingX="spacings.lg"
        paddingBottom="spacings.sm"
        paddingTop="spacings.xl"
        color="colors.onSurface.lv1"
      >
        {t('teamSquadPanel.players')}
      </Heading>
      {players.map((player, index) => (
        <Fragment key={player.id}>
          <TeamPlayerLabel key={player.id} player={player} sportSlug={sportSlug} teamId={teamDetails.id} />
          {index !== players.length - 1 ? (
            <Box marginTop="spacings.sm">
              <Separator />
            </Box>
          ) : null}
        </Fragment>
      ))}
    </Box>
  )
}
