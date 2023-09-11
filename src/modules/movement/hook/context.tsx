/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Movement } from '#types'

interface MovementContextState {
  movements: Movement[]
  setMovements: (movements: Movement[]) => void
}

export const MovementContext = createContext<MovementContextState>({
  movements: [],
  setMovements: () => {},
})

interface ProviderProps {
  children: React.ReactNode
}

export const MovementContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ movements, setMovements ] = useState<Movement[]>([])
  return (
    <MovementContext.Provider value={{
      movements,
      setMovements: (movements: Movement[]) => setMovements(movements),
    }}>
      {children}
    </MovementContext.Provider>
  )
}
