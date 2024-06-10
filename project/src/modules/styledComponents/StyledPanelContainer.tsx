import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  display: flex;
  flex: 1;
  gap: t('spacings.xl');
  align-items: flex-start;
  @media (max-width: t('breakpoints.xl')) {
    align-items: center;
    flex-direction: column;
    gap: t('spacings.md');
  }
`

export default function StyledPanelContainer({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
