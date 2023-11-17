import { useCity } from '#city/hook'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const CityRoot: React.FC = () => {
  const { city, cities, select, gather } = useCity()

  useEffect(() => {
    if (!cities.length || city) {
      return
    }

    select({ cityId: cities[0].id })
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

  return <>
    <Outlet />
  </>
}
