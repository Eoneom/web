import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { LayoutPage } from '#ui/layout/page'
import { MovementList } from '#movement/list'
import { useMovement } from '#movement/hook'
import { MovementDetails } from '#movement/details'

export const MovementPage: React.FC = () => {
  const { movementId } = useParams()
  const { movement, select, deselect } = useMovement()

  useEffect(() => {
    if (!movementId) {
      deselect()
      return
    }

    select({ movementId })
  }, [movementId])

  return <LayoutPage details={movement && <MovementDetails movement={movement}/>}>
    <MovementList />
  </LayoutPage>
}
