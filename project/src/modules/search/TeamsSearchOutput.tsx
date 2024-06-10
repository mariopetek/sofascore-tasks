import { searchTeamsClient } from '@/api/search'
import ErrorMessage from '@/components/ErrorMessage'
import Loader from '@/components/Loader'
import { Box, Image } from '@kuma-ui/core'

interface TeamsSearchOutputProps {
  query: string
}

export default function TeamsSearchOutput({ query }: TeamsSearchOutputProps) {
  const { teams, teamsError, teamsLoading } = searchTeamsClient(query)

  return (
    <>
      {!teams
        ? null
        : teams.map(team => (
            <Box
              key={team.id}
              padding="spacings.lg"
              display="flex"
              gap="spacings.sm"
              alignItems="center"
              _hover={{ bg: 'colors.surface.s2' }}
              cursor="pointer"
            >
              <Image
                src={`https://academy-backend.sofascore.dev/team/${team.id}/image`}
                width="24px"
                height="24px"
                alt={team.name}
              />
              <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm">
                {team.name}
              </Box>
            </Box>
          ))}
      {teamsLoading ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <Loader />
        </Box>
      ) : null}
      {teamsError ? (
        <Box display="flex" justifyContent="center" padding="spacings.xxxl">
          <ErrorMessage message="Failed to load players" />
        </Box>
      ) : null}
    </>
  )
}
