import { resetCity } from '#city/slice'
import { useAppDispatch, useAppSelector } from '#store/type'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { selectToken } from '#auth/slice'
import { getOutpost } from '#outpost/slice/thunk'

export const OutpostRoot: React.FC = () => {
  const { outpostId } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  useEffect(() => {
    if (!outpostId || !token) {
      return
    }

    dispatch(resetCity())
    dispatch(getOutpost(outpostId))
  }, [outpostId, token])

  return <>
    <Outlet />
  </>
}
