import React from 'react'
import { displayRemainingTime } from '../../../helpers/transform'
import { Building } from '../../../shared/types'
import { useBuilding } from '../hook'
import { useTimer } from '../../../shared/hooks/timer'

interface Props {
  building: Building
  cityId: string
  isBuildingInProgress: boolean
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentItem: React.FC<Props> = ({ building, cityId, isBuildingInProgress, onSelectBuilding }) => {
  const { upgrade, list } = useBuilding({ cityId })
  const { remainingTime } = useTimer({ doneAt: building.upgrade_at, onDone: () => list()})

  return <article>
    <h4 onClick={() => onSelectBuilding(building)}>{building.name} {building.level}</h4>
    {displayRemainingTime(remainingTime)}
    {
      !isBuildingInProgress &&
      <button onClick={async () => upgrade({ buildingCode: building.code })}>
        Construire
      </button>
    }
  </article>
}
