import { useCity } from '#city/hook'
import { useOutpost } from '#outpost/hook'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const SharedRoot: React.FC = () => {
  const { city, cities, select } = useCity()
  const { outpost } = useOutpost()

  useEffect(() => {
    if (city || outpost) {
      return
    }

    if (!cities.length) {
      return
    }

    select({ cityId: cities[0].id })
  }, [city, outpost, cities])
  return <Outlet />
}
