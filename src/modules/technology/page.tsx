import React, { useEffect } from 'react'
import { TechnologyList } from '#technology/list'
import { TechnologyDetails } from '#technology/details/index'
import { useTechnology } from '#technology/hook'
import { LayoutPage } from '#ui/layout/page'
import { useBuilding } from '#building/hook'
import { useAppDispatch, useAppSelector } from '#store/type'
import { listTechnologies } from '#technology/slice/thunk'
import { useAuth } from '#auth/hook'
import {  selectCityId } from '#city/slice'

export const TechnologyPage: React.FC = () => {
  const cityId = useAppSelector(selectCityId)
  const dispatch = useAppDispatch()
  const { technology } = useTechnology()
  const { list: listBuildings } = useBuilding()
  const { token } = useAuth()

  useEffect(() => {
    if (!cityId) {
      return
    }

    dispatch(listTechnologies(token))
    listBuildings()
  }, [cityId, token])

  return <LayoutPage details={technology && <TechnologyDetails technology={technology}/>}>
    <TechnologyList />
  </LayoutPage>
}
