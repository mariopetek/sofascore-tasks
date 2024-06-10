import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  max-width: 448px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: t('spacings.md');
  @media (max-width: t('breakpoints.xl')) {
    max-width: 920px;
  }
`

export default function StyledPanelSection({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
