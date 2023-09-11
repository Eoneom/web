import { useMovement } from '#movement/hook'
import { MovementListItem } from '#movement/list/item'
import React from 'react'

export const MovementList: React.FC = () => {
  const { movements } = useMovement()

  return <ul>
    {movements.map(movement => <MovementListItem key={movement.id} movement={movement}/>)}
  </ul>
}
