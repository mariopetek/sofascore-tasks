import { Box, Image } from '@kuma-ui/core'
import { getCountryCodeByName } from '@/utils/country/country'
import Link from 'next/link'
import { Player } from '@/model/player'
import { Sport } from '@/model/sport'
import { Team } from '@/model/team'
import { useState } from 'react'
import ImagePlaceholder from '../../components/ImagePlaceholder'

interface TeamPlayerLabelProps {
  player: Player
  sportSlug: Sport['slug']
  teamId: Team['id']
}

export default function TeamPlayerLabel({ player, sportSlug, teamId }: TeamPlayerLabelProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(true)

  return (
    <Link href={`/${sportSlug}/team/${teamId}/player/${player.id}`}>
      <Box
        paddingX="spacings.lg"
        paddingY="spacings.sm"
        display="flex"
        alignItems="center"
        gap="spacings.lg"
        _hover={{ bg: 'colors.surface.s2' }}
      >
        {isImageLoaded ? (
          <Image
            src={`https://academy-backend.sofascore.dev/player/${player.id}/image`}
            alt={player.name}
            width="40px"
            height="40px"
            borderRadius="50%"
            onError={() => setIsImageLoaded(false)}
          />
        ) : (
          <ImagePlaceholder width="40px" height="40px" />
        )}

        <Box display="flex" flexDirection="column" gap="spacings.xs">
          <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
            {player.name}
          </Box>
          <Box display="flex" alignItems="center" gap="spacings.xs">
            <Image
              src={`https://www.sofascore.com/static/images/flags/${getCountryCodeByName(player.country.name)}.png`}
              alt={player.country.name}
              width="16px"
              height="16px"
            />
            <Box as="span" color="colors.onSurface.lv2" fontSize="fontSizes.xs" fontWeight="fontWeights.bold">
              {player.country.name}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
