import { BuildingContentList } from '#building/content/list'
import { BuildingDetails } from '#building/details'
import { useBuilding } from '#building/hook'
import { PageLayout } from '#shared/layout/page'
import React, { useMemo, useState } from 'react'

export const BuildingPage: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState('')
  const { buildings } = useBuilding()
  const selectedBuilding = useMemo(() => {
    return buildings.find(building => building.id === selectedBuildingId)
  }, [selectedBuildingId, buildings])

  return <PageLayout
    content={<BuildingContentList onSelectBuilding={({id}) => setSelectedBuildingId(id)}/>}
    details={selectedBuilding && <BuildingDetails building={selectedBuilding}/>}
    displayDetails={Boolean(selectedBuilding)}
  />
}
