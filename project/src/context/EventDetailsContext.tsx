import { Event } from '@/model/event'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface ContextValue {
  selectedEventId: Event['id'] | null
  setSelectedEventId: React.Dispatch<React.SetStateAction<Event['id'] | null>>
  isDetailsPanelOpen: boolean
  setIsDetailsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EventDetailsContext = createContext<ContextValue>({} as ContextValue)

export const EventDetailsContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedEventId, setSelectedEventId] = useState<Event['id'] | null>(null)
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false)

  return (
    <EventDetailsContext.Provider
      value={{ selectedEventId, setSelectedEventId, isDetailsPanelOpen, setIsDetailsPanelOpen }}
    >
      {children}
    </EventDetailsContext.Provider>
  )
}

export const useEventDetailsContext = () => useContext(EventDetailsContext)
