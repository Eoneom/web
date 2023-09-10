import { useMovement } from '#troup/movement/hook'
import { MovementItem } from '#troup/movement/item'
import React from 'react'

export const MovementList: React.FC = () => {
  const { movements } = useMovement()

  return <ul>
    {movements.map(movement => <MovementItem key={movement.id} movement={movement}/>)}
  </ul>
}
