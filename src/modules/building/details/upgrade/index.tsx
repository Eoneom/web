import React from 'react'
import { useBuilding } from '#building/hook'
import { useCity } from '#city/hook'
import { Building } from '#types'
import { Button } from '#ui/button'
import { hasEnoughResources } from '#helpers/validation'

interface Props {
  building: Building
}

export const BuildingDetailsUpgrade: React.FC<Props> = ({ building }) => {
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const { city } = useCity()
  const canBuild = !inProgress &&
    levelsTotal < (city?.maximum_building_levels ?? 0) &&
    hasEnoughResources({ city, cost: building.upgrade_cost })

  return <Button
    disabled={!canBuild}
    onClick={() => upgrade({ code: building.code })}
  >
    Construire
  </Button>
}
