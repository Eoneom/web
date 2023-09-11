import React from 'react'

import { BuildingContextProvider } from '#building/hook/context'
import { TechnologyContextProvider } from '#technology/hook/context'
import { TroupContextProvider } from '#troup/hook/context'
import { MovementContextProvider } from '#movement/hook/context'
import { ReportContextProvider } from '#communication/report/hook/context'

interface Props {
  children: React.ReactNode
}

export const GameProvider: React.FC<Props> = ({children}) => {
  return (
    <BuildingContextProvider>
      <TechnologyContextProvider>
        <TroupContextProvider>
          <MovementContextProvider>
            <ReportContextProvider>
              {children}
            </ReportContextProvider>
          </MovementContextProvider>
        </TroupContextProvider>
      </TechnologyContextProvider>
    </BuildingContextProvider>
  )
}
