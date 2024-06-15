import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  flex: 1;
  @media (max-width: t('breakpoints.md')) {
    display: none;
  }
`

export default function StyledHeaderPlaceholder({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
