import React from 'react'
import { displayRemainingTime } from '../../helpers/transform'
import { upgradeBuilding } from '../../api/building/upgrade'
import { Building } from '../../types'

interface Props {
  building: Building
  cityId: string
  token: string
  isBuildingInProgress: boolean
  onSelectBuilding: (building: Building) => void
}

export const ContentBuilding: React.FC<Props> = ({ building, cityId, token, isBuildingInProgress, onSelectBuilding }) => {
  return <article key={building.code}>
    <h4 onClick={() => onSelectBuilding(building)}>{building.name} {building.level}</h4>
    {displayRemainingTime(building.upgrade_at)} {
      !isBuildingInProgress && <button onClick={() => {
        upgradeBuilding({ token, city_id: cityId, building_code: building.code })
      } }>
        Construire
      </button>}
  </article>
}
