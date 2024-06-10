import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  max-width: 1392px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: t('spacings.xl');
  @media (max-width: t('breakpoints.xl')) {
    justify-content: center;
  }
`

export default function StyledPageContainer({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
