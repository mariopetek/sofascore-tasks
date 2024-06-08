import { Event } from '@/model/event'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface ContextValue {
  selectedEvent: Event | null
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>
  isDetailsPanelOpen: boolean
  setIsDetailsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EventDetailsContext = createContext<ContextValue>({} as ContextValue)

export const EventDetailsContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false)

  return (
    <EventDetailsContext.Provider
      value={{ selectedEvent, setSelectedEvent, isDetailsPanelOpen, setIsDetailsPanelOpen }}
    >
      {children}
    </EventDetailsContext.Provider>
  )
}

export const useEventDetailsContext = () => useContext(EventDetailsContext)
