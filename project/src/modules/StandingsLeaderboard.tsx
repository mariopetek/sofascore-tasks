import { Sport } from '@/model/sport'
import { Team } from '@/model/team'
import { StandingRow } from '@/model/tournament'
import { Box } from '@kuma-ui/core'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface StandingsLeaderboardProps {
  standings: StandingRow[]
  sportSlug: Sport['slug']
  teamId?: Team['id']
}

export default function StandingsLeaderboard({ standings, sportSlug, teamId }: StandingsLeaderboardProps) {
  const [t] = useTranslation('global')

  function calculateGamesBehind(leaderWins: number, leaderLosses: number, teamWins: number, teamLosses: number) {
    const gamesBehind = (leaderWins - teamWins + (teamLosses - leaderLosses)) / 2
    return gamesBehind
  }

  return (
    <>
      <Box padding="spacings.lg" display="flex" justifyContent="space-evenly" color="colors.onSurface.lv2">
        <Box display="flex" alignItems="center" gap="spacings.lg" flex="2">
          <Box as="span" width="24px" textAlign="center">
            #
          </Box>
          <Box as="span">{t('standingsLeaderboard.team')}</Box>
        </Box>
        <Box flex="3" display="flex" justifyContent="space-between" textAlign="center">
          <Box as="span" maxWidth="62px" width="100%">
            {t('standingsLeaderboard.p')}
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            {t('standingsLeaderboard.w')}
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'none' : 'inline'}>
            {t('standingsLeaderboard.d')}
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            {t('standingsLeaderboard.l')}
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
            {t('standingsLeaderboard.diff')}
          </Box>
          <Box as="span" maxWidth="62px" width="100%" display={sportSlug === 'basketball' ? 'inline' : 'none'}>
            {t('standingsLeaderboard.gb')}
          </Box>
          <Box
            as="span"
            maxWidth="62px"
            width="100%"
            display={sportSlug === 'basketball' || sportSlug === 'american-football' ? 'none' : 'inline'}
          >
            {t('standingsLeaderboard.goals')}
          </Box>
          <Box as="span" maxWidth="62px" width="100%">
            {standings[0].points
              ? t('standingsLeaderboard.pts')
              : standings[0].percentage
              ? t('standingsLeaderboard.pct')
              : null}
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
                {index === 0
                  ? '-'
                  : calculateGamesBehind(
                      standings[0].wins,
                      standings[0].losses,
                      standingRow.wins,
                      standingRow.losses
                    ).toFixed(1)}
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
