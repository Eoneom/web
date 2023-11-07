/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Technology, TechnologyItem } from '#types'

interface TechnologyContextState {
  technology: Technology | null
  setTechnology: (technology: Technology | null) => void

  technologies: TechnologyItem[]
  setTechnologies: (technologies: TechnologyItem[]) => void
}

export const TechnologyContext = createContext<TechnologyContextState>({
  technology: null,
  setTechnology: () => {},

  technologies: [],
  setTechnologies: () => {},
})

interface Props {
  children: React.ReactNode
}

export const TechnologyContextProvider: React.FC<Props> = ({ children }) => {
  const [ technologies, setTechnologies ] = useState<TechnologyItem[]>([])
  const [ technology, setTechnology ] = useState<Technology | null>(null)

  return (
    <TechnologyContext.Provider value={{
      technologies,
      setTechnologies: (technologies: TechnologyItem[]) => setTechnologies(technologies),

      technology,
      setTechnology: (technology: Technology | null) =>  setTechnology(technology)
    }}>
      {children}
    </TechnologyContext.Provider>
  )
}
