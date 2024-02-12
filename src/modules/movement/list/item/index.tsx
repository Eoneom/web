import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTimer } from '#hook/timer'
import { MovementItem } from '#types'
import { useMovement } from '#movement/hook'
import { NavLink } from 'react-router-dom'
import { getUrlPrefix } from '#helpers/url'
import { useAppDispatch, useAppSelector } from '#store/type'
import { selectCityId } from '#city/slice'
import { countUnreadReports } from '#communication/report/slice/thunk'
import { selectOutpostId } from '#outpost/slice'
import { listOutposts } from '#outpost/slice/thunk'

interface Props {
  movement: MovementItem
}

export const MovementListItem: React.FC<Props> = ({ movement }) => {
  const dispatch = useAppDispatch()
  const cityId = useAppSelector(selectCityId)
  const outpostId = useAppSelector(selectOutpostId)
  const { finish } = useMovement()

  const { remainingTime } = useTimer({
    onDone: async () => {
      const { isOutpostCreated } = await finish()
      if (isOutpostCreated) {
        dispatch(listOutposts())
      }

      dispatch(countUnreadReports())
    },
    doneAt: movement.arrive_at
  })

  const urlPrefix = getUrlPrefix({ cityId, outpostId })

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
