import React from 'react'

import { TroupContextProvider } from '#troup/hook/context'
import { MovementContextProvider } from '#movement/hook/context'

interface Props {
  children: React.ReactNode
}

export const GameProvider: React.FC<Props> = ({children}) => {
  return (
    <TroupContextProvider>
      <MovementContextProvider>
        {children}
      </MovementContextProvider>
    </TroupContextProvider>
  )
}
