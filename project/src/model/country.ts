import countryCodes from '@/utils/country/countryCodes.json'

export interface Country {
  id: number
  name: keyof typeof countryCodes
}
