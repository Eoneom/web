import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTimer } from '#shared/hook/timer'
import { Movement } from '#shared/types'
import { useMovement } from '#troup/movement/hook'

interface Props {
  movement: Movement
}

export const MovementItem: React.FC<Props> = ({ movement }) => {
  const { finish } = useMovement()
  const { remainingTime } = useTimer({ onDone: () => finish({ movementId: movement.id }), doneAt: movement.arrive_at })
  return <li>
    {movement.action}
    {movement.origin.sector} {movement.origin.x} {movement.origin.y}
    {' --> '}
    {movement.destination.sector} { movement.destination.x} {movement.destination.y} {' : '}
    {formatTime(remainingTime)}
  </li>
}
