import { Event } from '@/model/event'
import useSWR from 'swr'

const EVENT_URL = '/api/event'

export function getEventDetails(eventId: Event['id']) {
  const { data, error, isLoading } = useSWR<Event>(`${EVENT_URL}/${eventId}`)
  return {
    event: data,
    eventError: error,
    eventLoading: isLoading,
  }
}
