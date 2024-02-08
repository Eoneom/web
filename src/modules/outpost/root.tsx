import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { useOutpost } from '#outpost/hook'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const OutpostRoot: React.FC = () => {
  const { outpostId } = useParams()
  const { deselect: deselectCity } = useCity()
  const { select } = useOutpost()
  const { token } = useAuth()

  useEffect(() => {
    if (!outpostId || !token) {
      return
    }

    deselectCity()
    select({ outpostId })
  }, [outpostId, token])

  return <>
    <Outlet />
  </>
}
