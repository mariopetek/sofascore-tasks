import { Event } from '@/model/event'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

interface ContextValue {
  events: Event[]
  setEvents: Dispatch<SetStateAction<Event[]>>
}

const TrackedEventsContext = createContext<ContextValue>({} as ContextValue)

export const TracnkedEventsContextProvider = ({ children }: PropsWithChildren) => {
  const [events, setEvents] = useState<Event[]>([])

  return <TrackedEventsContext.Provider value={{ events, setEvents }}>{children}</TrackedEventsContext.Provider>
}

export const useTrackedEventsContext = () => useContext(TrackedEventsContext)
