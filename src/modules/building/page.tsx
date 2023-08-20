import { BuildingContentList } from '#building/content/list'
import { BuildingDetails } from '#building/details'
import { useBuilding } from '#building/hook'
import React, { useMemo, useState } from 'react'

export const BuildingPage: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState('')
  const { buildings } = useBuilding()
  const selectedBuilding = useMemo(() => {
    return buildings.find(building => building.id === selectedBuildingId)
  }, [selectedBuildingId, buildings])

  return <>
    <section id="content" className={selectedBuilding ? 'details-enabled': ''}>
      <BuildingContentList onSelectBuilding={({id}) => setSelectedBuildingId(id)}/>
    </section>
    {
      selectedBuilding && <section id="details">
        <BuildingDetails building={selectedBuilding}/>
      </section>
    }
  </>
}
