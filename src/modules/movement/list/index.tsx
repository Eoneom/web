import { useMovement } from '#movement/hook'
import { MovementListItem } from '#movement/list/item'
import React, { useEffect } from 'react'

export const MovementList: React.FC = () => {
  const { movements, list } = useMovement()

  useEffect(() => {
    list()
  }, [])

  return <>
    <h2>En cours</h2>
    {
      movements.length ?
        <ul>
          {movements.map(movement => <MovementListItem key={movement.id} movement={movement}/>)}
        </ul>:
        <p>Pas de déplacement actuellement</p>
    }
  </>
}
