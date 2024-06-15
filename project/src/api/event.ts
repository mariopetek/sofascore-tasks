import { Event, Incident } from '@/model/event'
import useSWR from 'swr'

export async function getEventDetails(eventId: Event['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/event/${eventId}`)
  const event = (await response.json()) as Event

  return event
}

export async function getEventIncidents(eventId: Event['id']) {
  const response = await fetch(`https://academy-backend.sofascore.dev/event/${eventId}/incidents`)
  const incidents = (await response.json()) as Incident[]

  return incidents
}

export function getEventIncidentsClient(eventId: Event['id']) {
  const { data, error, isLoading } = useSWR<Incident[]>(`/api/event/${eventId}/incidents`)
  return {
    incidents: data,
    incidentsError: error,
    incidentsLoading: isLoading,
  }
}
