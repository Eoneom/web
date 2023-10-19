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

interface Props {
  children: React.ReactNode
}

export const MovementContextProvider: React.FC<Props> = ({ children }) => {
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
