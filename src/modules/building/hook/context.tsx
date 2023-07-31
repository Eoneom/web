import React, { createContext, useState } from 'react'
import { Building } from '../../../types'

interface BuildingContextState {
  buildings: Building[]
  setBuildings: (buildings: Building[]) => void
}

export const BuildingContext = createContext<BuildingContextState>({
  buildings: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBuildings: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

export const BuildingContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ buildings, setBuildings ] = useState<Building[]>([])
  return (
    <BuildingContext.Provider value={{
      buildings,
      setBuildings: (buildings: Building[]) => setBuildings(buildings)
    }}>
      {children}
    </BuildingContext.Provider>
  )
}
