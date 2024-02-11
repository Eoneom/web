import { resetCity } from '#city/slice'
import { useAppDispatch, useAppSelector } from '#store/type'
import { useOutpost } from '#outpost/hook'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { selectToken } from '#auth/slice'

export const OutpostRoot: React.FC = () => {
  const { outpostId } = useParams()
  const { select } = useOutpost()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  useEffect(() => {
    if (!outpostId || !token) {
      return
    }

    dispatch(resetCity())
    select({ outpostId })
  }, [outpostId, token])

  return <>
    <Outlet />
  </>
}
