import React, { PropsWithChildren } from 'react'
import { Box } from '@kuma-ui/core'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Box as="main">{children}</Box>
    </>
  )
}
