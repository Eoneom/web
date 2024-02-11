import { BuildingList } from '#building/list'
import { BuildingDetails } from '#building/details'
import { useBuilding } from '#building/hook'
import { LayoutPage } from '#ui/layout/page'
import React, { useEffect } from 'react'
import { selectCityId } from '#city/slice'
import { useAppDispatch, useAppSelector } from '#store/type'
import { listTechnologies } from '#technology/slice/thunk'
import { useAuth } from '#auth/hook'

export const BuildingPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const cityId = useAppSelector(selectCityId)
  const { token } = useAuth()
  const { building, list } = useBuilding()

  useEffect(() => {
    if (!cityId) {
      return
    }

    list()
    dispatch(listTechnologies(token))
  }, [cityId])

  return <LayoutPage details={building && <BuildingDetails building={building}/>}>
    <BuildingList />
  </LayoutPage>
}
