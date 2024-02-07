/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Movement, MovementItem } from '#types'

interface MovementContextState {
  movement: Movement | null
  setMovement: (movement: Movement | null) => void

  movements: MovementItem[]
  setMovements: (movements: MovementItem[]) => void
}

export const MovementContext = createContext<MovementContextState>({
  movement: null,
  setMovement: () => {},

  movements: [],
  setMovements: () => {},
})

interface Props {
  children: React.ReactNode
}

export const MovementContextProvider: React.FC<Props> = ({ children }) => {
  const [ movements, setMovements ] = useState<MovementItem[]>([])
  const [ movement, setMovement ] = useState<Movement | null>(null)
  return (
    <MovementContext.Provider value={{
      movement,
      setMovement: (movement: Movement | null) => setMovement(movement),

      movements,
      setMovements: (movements: MovementItem[]) => setMovements(movements),
    }}>
      {children}
    </MovementContext.Provider>
  )
}
