import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTimer } from '#hook/timer'
import { MovementItem } from '#types'
import { useMovement } from '#movement/hook'
import { NavLink } from 'react-router-dom'
import { useOutpost } from '#outpost/hook'
import { getUrlPrefix } from '#helpers/url'
import { useAppDispatch, useAppSelector } from '#store/type'
import { selectCityId } from '#city/slice'
import { countUnreadReports } from '#communication/report/slice/thunk'

interface Props {
  movement: MovementItem
}

export const MovementListItem: React.FC<Props> = ({ movement }) => {
  const dispatch = useAppDispatch()
  const cityId = useAppSelector(selectCityId)
  const { finish } = useMovement()
  const { list, outpost } = useOutpost()

  const { remainingTime } = useTimer({
    onDone: async () => {
      const { isOutpostCreated } = await finish()
      if (isOutpostCreated) {
        await list()
      }
      dispatch(countUnreadReports())
    },
    doneAt: movement.arrive_at
  })

  const urlPrefix = getUrlPrefix({ cityId, outpostId: outpost?.id })

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
