import React from 'react'
import { useBuilding } from '#building/hook'
import { useCity } from '#city/hook'
import { Building } from '#types'
import { Button } from '#ui/button'

interface Props {
  building: Building
}

export const BuildingDetailsUpgrade: React.FC<Props> = ({ building }) => {
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const { city } = useCity()
  const canBuild = !inProgress &&
    levelsTotal < (city?.maximum_building_levels ?? 0) &&
    building.upgrade_cost.plastic < (city?.plastic ?? 0) &&
    building.upgrade_cost.mushroom < (city?.mushroom ?? 0)

  return <Button
    disabled={!canBuild}
    onClick={() => upgrade({ code: building.code })}
  >
    Construire
  </Button>
}
