import SettingsPanel from '@/modules/settings/SettingsPanel'
import { Box } from '@kuma-ui/core'

export default function SettingsPage() {
  return (
    <Box
      maxWidth="1392px"
      width="100%"
      display="flex"
      alignItems="flex-start"
      gap="spacings.xl"
      justifyContent="center"
    >
      <SettingsPanel />
    </Box>
  )
}
