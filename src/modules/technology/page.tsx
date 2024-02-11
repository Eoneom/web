import React, { useEffect } from 'react'
import { TechnologyList } from '#technology/list'
import { TechnologyDetails } from '#technology/details/index'
import { useTechnology } from '#technology/hook'
import { LayoutPage } from '#ui/layout/page'
import { useAppDispatch, useAppSelector } from '#store/type'
import { listTechnologies } from '#technology/slice/thunk'
import {  selectCityId } from '#city/slice'
import { listBuildings } from '#building/slice/thunk'

export const TechnologyPage: React.FC = () => {
  const cityId = useAppSelector(selectCityId)
  const dispatch = useAppDispatch()
  const { technology } = useTechnology()

  useEffect(() => {
    if (!cityId) {
      return
    }

    dispatch(listTechnologies())
    dispatch(listBuildings())
  }, [cityId])

  return <LayoutPage details={technology && <TechnologyDetails technology={technology}/>}>
    <TechnologyList />
  </LayoutPage>
}
