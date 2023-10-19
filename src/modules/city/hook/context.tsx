/* eslint-disable @typescript-eslint/no-empty-function */
import { City } from '#types'
import React, { createContext, useState } from 'react'

interface CityContextState {
  city: City | null
  setCity: (city: City) => void

  cities: {
    id: string
    name: string
  }[]
  setCities: (cities: { id: string, name: string }[]) => void
}

export const CityContext = createContext<CityContextState>({
  city: null,
  setCity: () => {},

  cities: [],
  setCities: () => {}
})

interface Props {
  children: React.ReactNode
}

export const CityContextProvider: React.FC<Props> = ({ children }) => {
  const [ city, setCity ] = useState<City | null>(null)
  const [ cities, setCities ] = useState<{ id: string, name: string }[]>([])

  return (
    <CityContext.Provider value={{
      city,
      setCity: (city: City) => setCity(city),

      cities,
      setCities
    }}>
      {children}
    </CityContext.Provider>
  )
}
