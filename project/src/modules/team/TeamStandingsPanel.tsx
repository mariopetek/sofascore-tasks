import { Tournament } from '@/model/tournament'
import { Box, Image } from '@kuma-ui/core'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import TeamStandingsLeaderboard from './TeamStandingsLeaderboard'
import { Team } from '@/model/team'

function OutsideClickHandler({ children, onOutsideClick }: PropsWithChildren<{ onOutsideClick: () => void }>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      onOutsideClick()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return <Box ref={wrapperRef}>{children}</Box>
}

interface TeamStandingsPanelProps {
  tournaments: Tournament[]
  teamId: Team['id']
}

export default function TeamStandingsPanel({ tournaments, teamId }: TeamStandingsPanelProps) {
  const [selectedTournament, setSelectedTournament] = useState<Tournament>(tournaments[0])
  const [isTournamentsMenuOpen, setIsTournamentsMenuOpen] = useState(false)

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
      <Box paddingX="spacings.sm" paddingTop="spacings.sm">
        <Box padding="spacings.sm" bg="colors.surface.s2" borderRadius="radii.md">
          <Box position="relative" maxWidth="200px" width="100%" cursor="pointer">
            <OutsideClickHandler onOutsideClick={() => setIsTournamentsMenuOpen(false)}>
              <Box
                paddingY="spacings.xs"
                paddingLeft="spacings.md"
                paddingRight="spacings.xs"
                borderRadius="radii.md"
                color="colors.onSurface.lv1"
                boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                bg="colors.surface.s1"
                fontSize="fontSizes.xs"
                onClick={() => setIsTournamentsMenuOpen(!isTournamentsMenuOpen)}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap="spacings.sm">
                    <Image
                      src={`https://academy-backend.sofascore.dev/tournament/${selectedTournament.id}/image`}
                      width="16px"
                      height="16px"
                    />
                    <Box as="span" color="colors.onSurface.lv1">
                      {selectedTournament.name}
                    </Box>
                  </Box>
                  <Box
                    as="span"
                    maskSize="24px 24px"
                    maskImage="url(/icons/system/ic_pointer_down.svg)"
                    backgroundColor="colors.onSurface.lv1"
                    width="24px"
                    height="24px"
                  ></Box>
                </Box>
                {isTournamentsMenuOpen ? (
                  <Box
                    position="absolute"
                    top="100%"
                    left="0"
                    width="100%"
                    bg="colors.surface.s1"
                    boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
                    borderRadius="radii.md"
                    zIndex="1"
                  >
                    {tournaments.map(tournament => (
                      <Box
                        key={tournament.id}
                        paddingX="spacings.md"
                        paddingY="spacings.sm"
                        color="colors.onSurface.lv1"
                        display="flex"
                        alignItems="center"
                        gap="spacings.sm"
                        borderRadius="radii.md"
                        onClick={() => {
                          setSelectedTournament(tournament)
                          setIsTournamentsMenuOpen(false)
                        }}
                        _hover={{ bg: 'colors.surface.s2' }}
                      >
                        <Image
                          src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
                          width="16px"
                          height="16px"
                        />
                        <Box as="span" color="colors.onSurface.lv1">
                          {tournament.name}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </OutsideClickHandler>
          </Box>
        </Box>
      </Box>
      <TeamStandingsLeaderboard tournament={selectedTournament} teamId={teamId} />
    </Box>
  )
}
