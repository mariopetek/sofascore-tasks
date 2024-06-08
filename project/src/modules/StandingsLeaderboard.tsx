import { Sport } from '@/model/sport'
import { Team } from '@/model/team'
import { StandingRow } from '@/model/tournament'
import { Box } from '@kuma-ui/core'
import Link from 'next/link'

interface StandingsLeaderboardProps {
  standings: StandingRow[]
  sportSlug: Sport['slug']
  teamId?: Team['id']
}

export default function StandingsLeaderboard({ standings, sportSlug, teamId }: StandingsLeaderboardProps) {
  return (
    <>
      <Box padding="spacings.lg" display="flex" justifyContent="space-evenly" color="colors.onSurface.lv2">
        <Box display="flex" alignItems="center" gap="spacings.lg" flex="2">
          <Box as="span" width="24px" textAlign="center">
            #
          </Box>
          <Box as="span">Team</Box>
        </Box>
        <Box flex="3" display="flex" justifyContent="space-between" textAlign="center">
          <Box as="span" maxWidth="62px" width="100%">
            P
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            W
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'none' : 'inline'}>
            D
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            L
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
            DIFF
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
            Str
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
            GB
          </Box>
          <Box
            as="span"
            maxWidth="62px"
            width="100%"
            display={sportSlug === 'basketball' || sportSlug === 'american-football' ? 'none' : 'inline'}
          >
            Goals
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            {standings[0].points ? 'PTS' : standings[0].percentage ? 'PCT' : null}
          </Box>
        </Box>
      </Box>
      {standings.map((standingRow, index) => (
        <Link key={standingRow.id} href={`/${sportSlug}/team/${standingRow.team.id}`}>
          <Box
            padding="spacings.lg"
            display="flex"
            justifyContent="space-between"
            color="colors.onSurface.lv1"
            _hover={{ bg: teamId === standingRow.team.id ? 'colors.primary.highlight' : 'colors.surface.s2' }}
            bg={teamId === standingRow.team.id ? 'colors.primary.highlight' : 'colors.surface.s1'}
          >
            <Box display="flex" alignItems="center" gap="spacings.lg" flex="2">
              <Box
                as="span"
                width="24px"
                height="24px"
                padding="spacings.xs"
                bg={teamId === standingRow.team.id ? 'colors.surface.s1' : 'colors.secondary.default'}
                textAlign="center"
                borderRadius="50%"
              >
                {index + 1}
              </Box>
              <Box as="span">{standingRow.team.name}</Box>
            </Box>
            <Box flex="3" display="flex" justifyContent="space-between" textAlign="center">
              <Box as="span" maxWidth="62px" width="100%">
                {standingRow.played}
              </Box>
              <Box as="span" maxWidth="62px" width="100%">
                {standingRow.wins}
              </Box>
              <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'none' : 'inline'}>
                {standingRow.draws}
              </Box>
              <Box as="span" maxWidth="62px" width="100%">
                {standingRow.losses}
              </Box>
              <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
                {standingRow.scoresFor - standingRow.scoresAgainst}
              </Box>
              <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
                {`4`}
              </Box>
              <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
                {`16.0`}
              </Box>
              <Box
                as="span"
                maxWidth="62px"
                width="100%"
                display={sportSlug === 'basketball' || sportSlug === 'american-football' ? 'none' : 'inline'}
              >
                {standingRow.scoresFor}:{standingRow.scoresAgainst}
              </Box>
              <Box as="span" maxWidth="62px" width="100%">
                {standingRow.points
                  ? standingRow.points
                  : standingRow.percentage
                  ? standingRow.percentage.toFixed(3)
                  : null}
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </>
  )
}
