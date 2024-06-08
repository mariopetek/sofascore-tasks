import { Event, Incident } from '@/model/event'
import useSWR from 'swr'

export function getEventIncidentsClient(eventId: Event['id']) {
  const { data, error, isLoading } = useSWR<Incident[]>(`/api/event/${eventId}/incidents`)
  return {
    incidents: data,
    incidentsError: error,
    incidentsLoading: isLoading,
  }
}
