import { Sport } from '@/model/sport'
import { Tournament } from '@/model/tournament'
import { Box, Image } from '@kuma-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface TournamentLabelProps {
  tournament: Tournament
}

export default function TournamentLabel({ tournament }: TournamentLabelProps) {
  const router = useRouter()
  const isActive = () => router.asPath.startsWith(`/${tournament.sport.slug}/tournament/${tournament.id}`)

  return (
    <Link href={`/${tournament.sport.slug}/tournament/${tournament.id}`}>
      <Box
        display="flex"
        alignItems="center"
        gap="spacings.lg"
        paddingX="spacings.lg"
        paddingY="spacings.sm"
        cursor="pointer"
        _hover={{
          bg: isActive() ? 'colors.primary.highlight' : 'colors.surface.s2',
        }}
        bg={isActive() ? 'colors.primary.highlight' : 'colors.surface.s1'}
      >
        <Image
          src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
          alt={tournament.name}
          width="40px"
          height="40px"
        />
        <Box as="span" color="colors.onSurface.lv1" fontSize="fontSizes.sm" fontWeight="fontWeights.bold">
          {tournament.name}
        </Box>
      </Box>
    </Link>
  )
}
