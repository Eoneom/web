/* eslint-disable @typescript-eslint/no-empty-function */
import { Outpost, OutpostItem } from '#types'
import React, { createContext, useState } from 'react'

interface OutpostContextState {
  outposts: OutpostItem[]
  setOutposts: (outposts: OutpostItem[]) => void

  outpost: Outpost | null
  setOutpost: (outpost: Outpost | null) => void
}

export const OutpostContext = createContext<OutpostContextState>({
  outposts: [],
  setOutposts: () => {},

  outpost: null,
  setOutpost: () => {}
})

interface Props {
  children: React.ReactNode
}

export const OutpostContextProvider: React.FC<Props> = ({ children }) => {
  const [ outposts, setOutposts ] = useState<OutpostItem[]>([])
  const [ outpost, setOutpost ] = useState<Outpost | null>(null)

  return (
    <OutpostContext.Provider value={{
      outposts,
      setOutposts,

      outpost,
      setOutpost
    }}>
      {children}
    </OutpostContext.Provider>
  )
}
