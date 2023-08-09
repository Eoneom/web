import React, { createContext, useState } from 'react'
import { Technology } from '#shared/types'

interface TechnologyContextState {
  technologies: Technology[]
  setTechnologies: (technologies: Technology[]) => void
}

export const TechnologyContext = createContext<TechnologyContextState>({
  technologies: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTechnologies: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

export const TechnologyContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ technologies, setTechnologies ] = useState<Technology[]>([])
  return (
    <TechnologyContext.Provider value={{
      technologies,
      setTechnologies: (technologies: Technology[]) => setTechnologies(technologies)
    }}>
      {children}
    </TechnologyContext.Provider>
  )
}
