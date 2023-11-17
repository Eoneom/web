import React, { useEffect } from 'react'
import { TechnologyList } from '#technology/list'
import { TechnologyDetails } from '#technology/details/index'
import { useTechnology } from '#technology/hook'
import { LayoutPage } from '#ui/layout/page'
import { useBuilding } from '#building/hook'
import { useCity } from '#city/hook'

export const TechnologyPage: React.FC = () => {
  const { city } = useCity()
  const { list, technology } = useTechnology()
  const { list: listBuildings } = useBuilding()

  useEffect(() => {
    if (!city) {
      return
    }

    list()
    listBuildings()
  }, [city?.id])

  return <LayoutPage details={technology && <TechnologyDetails technology={technology}/>}>
    <TechnologyList />
  </LayoutPage>
}
