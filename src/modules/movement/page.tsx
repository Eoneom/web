import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { LayoutPage } from '#ui/layout/page'
import { MovementList } from '#movement/list'
import { useMovement } from '#movement/hook'
import { MovementDetails } from '#movement/details'
import { MovementCreate } from '#movement/create'
import { useTroup } from '#troup/hook'
import { useCity } from '#city/hook'
import { useOutpost } from '#outpost/hook'

export const MovementPage: React.FC = () => {
  const { movementId } = useParams()
  const { movement, select, deselect } = useMovement()
  const { list: listTroups } = useTroup()
  const { city } = useCity()
  const { outpost } = useOutpost()

  useEffect(() => {
    if (!city && !outpost) {
      return
    }

    listTroups()
  }, [city, outpost])

  useEffect(() => {
    if (!movementId) {
      deselect()
      return
    }

    select({ movementId })
  }, [movementId])

  return <LayoutPage details={movement && <MovementDetails movement={movement}/>}>
    <MovementCreate />
    <MovementList />
  </LayoutPage>
}
