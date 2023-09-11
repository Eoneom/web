/* eslint-disable @typescript-eslint/no-empty-function */
import { City } from '#types'
import React, { createContext, useState } from 'react'

interface CityContextState {
  selectedCityId: string
  setSelectedCityId: (cityId: string) => void
  cities: City[]
  setCities: (cities: City[]) => void
}

export const CityContext = createContext<CityContextState>({
  selectedCityId: '',
  setSelectedCityId: () => {},
  cities: [],
  setCities: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

export const CityContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ selectedCityId, setSelectedCityId ] = useState('')
  const [ cities, setCities ] = useState<City[]>([])
  return (
    <CityContext.Provider value={{
      selectedCityId,
      setSelectedCityId: (cityId: string) => setSelectedCityId(cityId),
      cities,
      setCities
    }}>
      {children}
    </CityContext.Provider>
  )
}
