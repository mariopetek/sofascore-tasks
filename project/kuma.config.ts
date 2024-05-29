import { createTheme } from '@kuma-ui/core'

const theme = createTheme({
  colors: {
    primary: {
      default: 'var(--primary-default)',
      variant: 'var(--primary-variant)',
      highlight: 'var(--primary-highlight)',
    },
    secondary: {
      default: 'var(--secondary-default)',
      variant: 'var(--secondary-variant)',
      highlight: 'var(--secondary-highlight)',
    },
    onColor: {
      primary: 'var(--on-color-primary)',
      secondary: 'var(--on-color-secondary)',
    },
    surface: {
      s0: 'var(--surface-0)',
      s1: 'var(--surface-1)',
      s2: 'var(--surface-2)',
    },
    onSurface: {
      lv1: 'var(--on-surface-lv1)',
      lv2: 'var(--on-surface-lv2)',
      lv3: 'var(--on-surface-lv3)',
      lv4: 'var(--on-surface-lv4)',
    },
    error: 'var(--error)',
    alert: 'var(--alert)',
    success: 'var(--success)',
    live: 'var(--live)',
  },
  spacings: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  breakpoints: {
    sm: '400px',
    md: '700px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  radii: {
    xs: '2px',
    lg: '16px',
  },
})

type UserTheme = typeof theme

declare module '@kuma-ui/core' {
  export interface Theme extends UserTheme {}
}

export default theme
