/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Troup } from '#types'

interface TroupContextState {
  troups: Troup[]
  setTroups: (troups: Troup[]) => void
}

export const TroupContext = createContext<TroupContextState>({
  troups: [],
  setTroups: () => {},
})

interface ProviderProps {
  children: React.ReactNode
}

export const TroupContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ troups, setTroups ] = useState<Troup[]>([])
  return (
    <TroupContext.Provider value={{
      troups,
      setTroups: (troups: Troup[]) => setTroups(troups),
    }}>
      {children}
    </TroupContext.Provider>
  )
}
