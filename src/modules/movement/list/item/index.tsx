import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTimer } from '#hook/timer'
import { MovementItem } from '#types'
import { useMovement } from '#movement/hook'
import { useReport } from '#communication/report/hook'
import { NavLink } from 'react-router-dom'
import { useCity } from '#city/hook'
import { useOutpost } from '#outpost/hook'
import { getUrlPrefix } from '#helpers/url'

interface Props {
  movement: MovementItem
}

export const MovementListItem: React.FC<Props> = ({ movement }) => {
  const { finish } = useMovement()
  const { countUnread } = useReport()
  const { city } = useCity()
  const { outpost } = useOutpost()
  const { remainingTime } = useTimer({
    onDone: async () => {
      await finish()
      await countUnread()
    },
    doneAt: movement.arrive_at
  })

  const urlPrefix = getUrlPrefix({ city, outpost })

  return <li>
    <NavLink to={`${urlPrefix}/movement/${movement.id}`}>
      {movement.action}
      {movement.origin.sector} {movement.origin.x} {movement.origin.y}
      {' -> '}
      {movement.destination.sector} { movement.destination.x} {movement.destination.y} {' : '}
      {formatTime(remainingTime)}
    </NavLink>
  </li>
}
