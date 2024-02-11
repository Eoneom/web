import { selectAllCities, selectCityId } from '#city/slice'
import { getCity } from '#city/slice/thunk'
import { useAppDispatch, useAppSelector } from '#store/type'
import { useOutpost } from '#outpost/hook'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const SharedRoot: React.FC = () => {
  const cities = useAppSelector(selectAllCities)
  const cityId = useAppSelector(selectCityId)
  const { outpost } = useOutpost()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (cityId || outpost) {
      return
    }

    if (!cities.length) {
      return
    }

    dispatch(getCity(cities[0].id))
  }, [cityId, outpost, cities])
  return <Outlet />
}
