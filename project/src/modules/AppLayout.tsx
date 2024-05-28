import { PropsWithChildren } from 'react'
import { Box } from '@kuma-ui/core'
import Header from './Header'
import Footer from './Footer'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Box as="main" flex="1" padding="spacings.lg" display="flex" justifyContent="center">
        {children}
      </Box>
      <Footer />
    </>
  )
}
