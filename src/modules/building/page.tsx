import { BuildingList } from '#building/list'
import { BuildingDetails } from '#building/details'
import { useBuilding } from '#building/hook'
import { LayoutPage } from '#ui/layout/page'
import React, { useEffect } from 'react'
import { useTechnology } from '#technology/hook'

export const BuildingPage: React.FC = () => {
  const { building, list } = useBuilding()
  const { list: listTechnologies } = useTechnology()

  useEffect(() => {
    list()
    listTechnologies()
  }, [])

  return <LayoutPage details={building && <BuildingDetails building={building}/>}>
    <BuildingList />
  </LayoutPage>
}
