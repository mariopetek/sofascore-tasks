import { Box } from '@kuma-ui/core'

export default function Loader() {
  return (
    <Box
      maskSize="48px 48px"
      maskImage="url(/icons/system/sofascore_logo.svg)"
      backgroundColor="colors.onSurface.lv2"
      width="48px"
      height="48px"
      animation="spin 1s linear infinite;"
    ></Box>
  )
}
