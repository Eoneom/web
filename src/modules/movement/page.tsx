import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { LayoutPage } from '#ui/layout/page'
import { MovementList } from '#movement/list'
import { useMovement } from '#movement/hook'
import { MovementDetails } from '#movement/details'
import { MovementCreate } from '#movement/create'
import { useTroup } from '#troup/hook'
import { useOutpost } from '#outpost/hook'
import { useAppSelector } from '#store/type'
import {  selectCityId } from '#city/slice'

export const MovementPage: React.FC = () => {
  const { movementId } = useParams()
  const { movement, select, deselect } = useMovement()
  const { list: listTroups } = useTroup()
  const cityId = useAppSelector(selectCityId)
  const { outpost } = useOutpost()

  useEffect(() => {
    if (!cityId && !outpost) {
      return
    }

    listTroups()
  }, [cityId, outpost])

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
