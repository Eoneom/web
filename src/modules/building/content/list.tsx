import React, { useMemo } from 'react'
import { BuildingContentItem } from '#building/content/item'
import { Building } from '#shared/types'
import { useBuilding } from '#building/hook'

interface Props {
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentList: React.FC<Props> = ({ onSelectBuilding }) => {
  const { buildings } = useBuilding()

  const isBuildingInProgress = useMemo(() => {
    return buildings.some(building => building.upgrade_at) ?? false
  }, [buildings])

  const building_items = useMemo(() => {
    return buildings.map(building => <BuildingContentItem
      onSelectBuilding={onSelectBuilding}
      isBuildingInProgress={isBuildingInProgress}
      key={building.id}
      building={building}/>)
  }, [buildings])

  return <>
    <h2>Constructions</h2>
    <div className='list'>
      {building_items}
    </div>
  </>
}
