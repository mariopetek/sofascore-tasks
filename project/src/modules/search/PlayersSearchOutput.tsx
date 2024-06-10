import { searchPlayersClient } from '@/api/search'
import ErrorMessage from '@/components/ErrorMessage'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Loader from '@/components/Loader'
import { Box, Image } from '@kuma-ui/core'
import { useState } from 'react'

interface PlayersSearchOutputProps {
  query: string
}

export default function PlayersSearchOutput({ query }: PlayersSearchOutputProps) {
  const { players, playersError, playersLoading } = searchPlayersClient(query)

  const [isImageLoaded, setIsImageLoaded] = useState(true)

  return (
    <>
      {!players
        ? null
        : players.map(player => (
            <Box
              key={player.id}
              padding="spacings.lg"
              display="flex"
              gap="spacings.sm"
              alignItems="center"
              _hover={{ bg: 'colors.surface.s2' }}
              cursor="pointer"
            >
              {isImageLoaded ? (
                <Image
                  src={`https://academy-backend.sofascore.dev/player/${player.id}/image`}
                  alt={player.name}
                  width="24px"
                  height="24px"
                  borderRadius="50%"
                  onError={() => setIsImageLoaded(false)}
                />
              ) : (
                <ImagePlaceholder width="24px" height="24px" />
              )}
              <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
                {player.name}
              </Box>
            </Box>
          ))}
      {playersLoading ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <Loader />
        </Box>
      ) : null}
      {playersError ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <ErrorMessage message="Failed to load players" />
        </Box>
      ) : null}
    </>
  )
}
