import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  max-width: 448px;
  width: 100%;
  @media (max-width: t('breakpoints.xl')) {
    display: none;
  }
`

export default function StyledTournamentsPanelWrapper({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
