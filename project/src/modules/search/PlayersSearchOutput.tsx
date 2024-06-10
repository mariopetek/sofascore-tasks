import { searchPlayersClient } from '@/api/search'
import ErrorMessage from '@/components/ErrorMessage'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Loader from '@/components/Loader'
import { Box, Image } from '@kuma-ui/core'
import Link from 'next/link'
import { useState } from 'react'

interface PlayersSearchOutputProps {
  query: string
  handleCloseDialog: () => void
}

export default function PlayersSearchOutput({ query, handleCloseDialog }: PlayersSearchOutputProps) {
  const { players, playersError, playersLoading } = searchPlayersClient(query)

  const [isImageLoaded, setIsImageLoaded] = useState(true)

  return (
    <>
      {!players
        ? null
        : players.map(player => (
            <Link key={player.id} href={`/${player.sport.slug}/player/${player.id}`} onClick={handleCloseDialog}>
              <Box
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
            </Link>
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
