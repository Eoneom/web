import React, { createContext, useState } from 'react'

interface CityContextState {
  selectedCityId: string
  setSelectedCityId: (cityId: string) => void
}

export const CityContext = createContext<CityContextState>({
  selectedCityId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedCityId: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

export const CityContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ selectedCityId, setSelectedCityId ] = useState('')
  return (
    <CityContext.Provider value={{
      selectedCityId,
      setSelectedCityId: (cityId: string) => setSelectedCityId(cityId)
    }}>
      {children}
    </CityContext.Provider>
  )
}
