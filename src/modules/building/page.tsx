import { BuildingList } from '#building/list'
import { BuildingDetails } from '#building/details'
import { useBuilding } from '#building/hook'
import { LayoutPage } from '#ui/layout/page'
import React, { useEffect } from 'react'
import { useTechnology } from '#technology/hook'
import { useCity } from '#city/hook'

export const BuildingPage: React.FC = () => {
  const { city } = useCity()
  const { building, list } = useBuilding()
  const { list: listTechnologies } = useTechnology()

  useEffect(() => {
    if (!city) {
      return
    }

    list()
    listTechnologies()
  }, [city?.id])

  return <LayoutPage details={building && <BuildingDetails building={building}/>}>
    <BuildingList />
  </LayoutPage>
}
