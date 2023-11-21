import { useCity } from '#city/hook'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const CityRoot: React.FC = () => {
  const { cityId } = useParams()
  const { city, cities, select, gather } = useCity()

  useEffect(() => {
    if (!cities.length || city || !cityId) {
      return
    }

    select({ cityId })
  }, [cities.length, city])

  useEffect(() => {
    if (!city?.id) {
      return
    }

    gather()

    const interval = setInterval(() => {
      gather()
    }, 10000)

    return () => clearInterval(interval)
  }, [city?.id])

  return <Outlet />
}
