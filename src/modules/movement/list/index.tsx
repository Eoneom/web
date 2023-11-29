import { useMovement } from '#movement/hook'
import { MovementListItem } from '#movement/list/item'
import React, { useEffect } from 'react'

export const MovementList: React.FC = () => {
  const { movements, list } = useMovement()

  useEffect(() => {
    list()
  }, [])

  return <ul>
    {movements.map(movement => <MovementListItem key={movement.id} movement={movement}/>)}
  </ul>
}
