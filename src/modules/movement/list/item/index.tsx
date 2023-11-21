import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTimer } from '#hook/timer'
import { Movement } from '#types'
import { useMovement } from '#movement/hook'

interface Props {
  movement: Movement
}

export const MovementListItem: React.FC<Props> = ({ movement }) => {
  const { finish } = useMovement()
  const { remainingTime } = useTimer({
    onDone: () => finish({ movementId: movement.id }),
    doneAt: movement.arrive_at
  })
  return <li>
    {movement.action}
    {movement.origin.sector} {movement.origin.x} {movement.origin.y}
    {' -> '}
    {movement.destination.sector} { movement.destination.x} {movement.destination.y} {' : '}
    {formatTime(remainingTime)}
  </li>
}
