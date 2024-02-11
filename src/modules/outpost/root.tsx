import { useAuth } from '#auth/hook'
import { resetCity } from '#city/slice'
import { useAppDispatch } from '#store/type'
import { useOutpost } from '#outpost/hook'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const OutpostRoot: React.FC = () => {
  const { outpostId } = useParams()
  const { select } = useOutpost()
  const { token } = useAuth()
  const dispatch = useAppDispatch()

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
