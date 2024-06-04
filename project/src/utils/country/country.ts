import { Country } from '@/model/country'
import countryCodes from './countryCodes.json'

export function getCountryCodeByName(name: Country['name']) {
  return countryCodes[name].toLowerCase()
}
