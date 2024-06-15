import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  display: none;
  @media (max-width: t('breakpoints.xl')) {
    display: block;
  }
`

export default function StyledHeaderLeaguesButton({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
