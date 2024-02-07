import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTimer } from '#hook/timer'
import { MovementItem } from '#types'
import { useMovement } from '#movement/hook'
import { useReport } from '#communication/report/hook'
import { NavLink } from 'react-router-dom'

interface Props {
  movement: MovementItem
}

export const MovementListItem: React.FC<Props> = ({ movement }) => {
  const { finish } = useMovement()
  const { countUnread } = useReport()
  const { remainingTime } = useTimer({
    onDone: async () => {
      await finish()
      await countUnread()
    },
    doneAt: movement.arrive_at
  })
  return <li>
    <NavLink to={`/movement/${movement.id}`}>
      {movement.action}
      {movement.origin.sector} {movement.origin.x} {movement.origin.y}
      {' -> '}
      {movement.destination.sector} { movement.destination.x} {movement.destination.y} {' : '}
      {formatTime(remainingTime)}
    </NavLink>
  </li>
}
