import React from 'react'
import { Building } from '../../../shared/types'
import { useBuilding } from '../hook'
import { useTimer } from '../../../shared/hooks/timer'
import { UIItem } from '../../../shared/ui/item'
import { BuildingTranslations } from '../translations'

interface Props {
  building: Building
  cityId: string
  isBuildingInProgress: boolean
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentItem: React.FC<Props> = ({ building, cityId, isBuildingInProgress, onSelectBuilding }) => {
  const { upgrade, list, cancel } = useBuilding({ cityId })
  const { remainingTime, reset } = useTimer({ doneAt: building.upgrade_at, onDone: () => list()})
  const { name } = BuildingTranslations[building.code]

  return <UIItem
    title={`${name} ${building.level}`}
    onTitleClick={() => onSelectBuilding(building)}
    time={ remainingTime || building.upgrade_cost.duration}
    action={<>
      {
        !isBuildingInProgress &&
        <button onClick={async () => upgrade({ buildingCode: building.code })}>
          Construire
        </button>
      }
      {
        building.upgrade_at &&
        <button onClick={async () => {
          await cancel()
          reset()
        }}>
          Annuler
        </button>
      }
    </>}
  />
}
