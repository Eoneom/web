import { BuildingList } from '#building/list'
import { BuildingDetails } from '#building/details'
import { useBuilding } from '#building/hook'
import { LayoutPage } from '#ui/layout/page'
import React, { useEffect, useMemo, useState } from 'react'

export const BuildingPage: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState('')
  const { buildings, list } = useBuilding()

  useEffect(() => {
    list()
  }, [])

  const selectedBuilding = useMemo(() => {
    return buildings.find(building => building.id === selectedBuildingId)
  }, [selectedBuildingId, buildings])

  return <LayoutPage details={<BuildingDetails building={selectedBuilding}/>}>
    <BuildingList onSelectBuilding={({id}) => setSelectedBuildingId(id)}/>
  </LayoutPage>
}
