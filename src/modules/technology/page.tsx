import React, { useEffect } from 'react'
import { TechnologyList } from '#technology/list'
import { TechnologyDetails } from '#technology/details/index'
import { useTechnology } from '#technology/hook'
import { LayoutPage } from '#ui/layout/page'
import { useBuilding } from '#building/hook'

export const TechnologyPage: React.FC = () => {
  const {  list, technology } = useTechnology()
  const { list: listBuildings } = useBuilding()

  useEffect(() => {
    list()
    listBuildings()
  }, [])

  return <LayoutPage details={technology && <TechnologyDetails technology={technology}/>}>
    <TechnologyList />
  </LayoutPage>
}
