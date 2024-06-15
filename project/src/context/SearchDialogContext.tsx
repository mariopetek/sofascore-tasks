import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

const SearchDialogContext = createContext<ContextValue>({} as ContextValue)

export const SearchDialogContextProvider = ({ children }: PropsWithChildren) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isDialogOpen])

  return (
    <SearchDialogContext.Provider value={{ isDialogOpen, setIsDialogOpen }}>{children}</SearchDialogContext.Provider>
  )
}

export const useSearchDialogContext = () => useContext(SearchDialogContext)
