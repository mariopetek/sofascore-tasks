import { Box } from '@kuma-ui/core'

interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box fontSize="fontSizes.xs" fontWeight="fontWeights.bold" color="colors.error">
      {message}
    </Box>
  )
}
