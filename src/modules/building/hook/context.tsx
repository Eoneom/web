/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Building, BuildingItem } from '#types'

interface BuildingContextState {
  building: Building | null
  setBuilding: (building: Building) => void

  buildings: BuildingItem[]
  setBuildings: (buildings: BuildingItem[]) => void
}

export const BuildingContext = createContext<BuildingContextState>({
  building: null,
  setBuilding: () => {},

  buildings: [],
  setBuildings: () => {}
})

interface Props {
  children: React.ReactNode
}

export const BuildingContextProvider: React.FC<Props> = ({ children }) => {
  const [ building, setBuilding ] = useState<Building |null>(null)
  const [ buildings, setBuildings ] = useState<BuildingItem[]>([])

  return (
    <BuildingContext.Provider value={{
      building,
      setBuilding: (building: Building) => setBuilding(building),

      buildings,
      setBuildings: (buildings: BuildingItem[]) => setBuildings(buildings)
    }}>
      {children}
    </BuildingContext.Provider>
  )
}
