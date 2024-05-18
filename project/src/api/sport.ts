import { Sport } from '@/model/sport'
import useSWR from 'swr'

const SPORTS_URL = '/api/sports'

export function getSports() {
  const { data, error } = useSWR<Sport[]>(SPORTS_URL)

  return {
    sports: data,
    sportsError: error,
  }
}
