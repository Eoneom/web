import React from 'react'
import { displayRemainingTime } from '../../../helpers/transform'
import { Building } from '../../../types'
import { useBuilding } from '../hook'
import { useTimer } from '../../../hooks/timer'

interface Props {
  building: Building
  cityId: string
  token: string
  isBuildingInProgress: boolean
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentItem: React.FC<Props> = ({ building, cityId, token, isBuildingInProgress, onSelectBuilding }) => {
  const { upgrade, list } = useBuilding({ token, cityId })
  const { remainingTime } = useTimer({ doneAt: building.upgrade_at, onDone: () => list()})

  return <article key={building.code}>
    <h4 onClick={() => onSelectBuilding(building)}>{building.name} {building.level}</h4>
    {displayRemainingTime(remainingTime)} {
      !isBuildingInProgress && <button onClick={async () => upgrade({ buildingCode: building.code })}>
        Construire
      </button>}
  </article>
}
