import { Box } from '@kuma-ui/core'

interface ImagePlaceholderProps {
  height: string
  width: string
}

export default function ImagePlaceholder({ height, width }: ImagePlaceholderProps) {
  return <Box width={width} height={height} borderRadius="50%" bg="colors.secondary.default"></Box>
}
