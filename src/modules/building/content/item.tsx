import React from 'react'

import { Building } from '#shared/types'
import { useBuilding } from '#building/hook'
import { useTimer } from '#shared/hooks/timer'
import { UIItem } from '#shared/ui/item'
import { BuildingTranslations } from '#building/translations'

interface Props {
  building: Building
  isBuildingInProgress: boolean
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentItem: React.FC<Props> = ({ building, isBuildingInProgress, onSelectBuilding }) => {
  const { upgrade, list, cancel } = useBuilding()
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
