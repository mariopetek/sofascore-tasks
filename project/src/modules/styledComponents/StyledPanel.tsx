import { styled } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

const StyledComponent = styled.div`
  background-color: t('colors.surface.s1');
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: t('radii.lg');
  max-width: 448px;
  width: 100%;
  padding: t('spacings.lg') 0;
  @media (max-width: t('breakpoints.xl')) {
    max-width: 920px;
  }
`

export default function StyledPanel({ children }: PropsWithChildren) {
  return <StyledComponent>{children}</StyledComponent>
}
