type SportSlug = 'football' | 'basketball' | 'american-football'

export interface Sport {
  id: number
  name: string
  slug: SportSlug
}
