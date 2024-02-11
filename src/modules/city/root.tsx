import { useAuth } from '#auth/hook'
import { selectCityId } from '#city/slice'
import { gatherCity, getCity } from '#city/slice/thunk'
import { useAppDispatch, useAppSelector } from '#store/type'
import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const CityRoot: React.FC = () => {
  const { cityId: cityIdFromParams } = useParams()
  const cityId = useAppSelector(selectCityId)
  const { token } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!cityIdFromParams) {
      return
    }

    dispatch(getCity({ token, cityId: cityIdFromParams }))
  }, [cityIdFromParams])

  useEffect(() => {
    dispatch(gatherCity(token))

    const interval = setInterval(() => {
      dispatch(gatherCity(token))
    }, 3000)

    return () => clearInterval(interval)
  }, [cityId])

  return <Outlet />
}
