import React, { useEffect, useMemo } from 'react'
import { BuildingContentItem } from './item'
import { Building } from '../../../types'
import { useBuilding } from '../hook'

interface Props {
  cityId: string
  token: string
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentList: React.FC<Props> = ({ cityId, token, onSelectBuilding }) => {
  const { buildings, list } = useBuilding({ token, cityId })

  useEffect(() => {
    list()
  }, [token, cityId])

  const isBuildingInProgress = useMemo(() => {
    return buildings.some(building => building.upgrade_at) ?? false
  }, [buildings])

  const building_items = useMemo(() => {
    return buildings.map(building => <BuildingContentItem
      onSelectBuilding={onSelectBuilding}
      isBuildingInProgress={isBuildingInProgress}
      key={building.id}
      building={building}
      token={token}
      cityId={building.city_id}/>)
  }, [buildings])

  return <section>
    <h2>Constructions</h2>
    {building_items}
  </section>
}
