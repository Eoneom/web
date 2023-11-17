/* eslint-disable @typescript-eslint/no-empty-function */
import { OutpostItem } from '#types'
import React, { createContext, useState } from 'react'

interface OutpostContextState {
  outposts: OutpostItem[]
  setOutposts: (outposts: OutpostItem[]) => void
}

export const OutpostContext = createContext<OutpostContextState>({
  outposts: [],
  setOutposts: () => {}
})

interface Props {
  children: React.ReactNode
}

export const OutpostContextProvider: React.FC<Props> = ({ children }) => {
  const [ outposts, setOutposts ] = useState<OutpostItem[]>([])

  return (
    <OutpostContext.Provider value={{
      outposts,
      setOutposts
    }}>
      {children}
    </OutpostContext.Provider>
  )
}
