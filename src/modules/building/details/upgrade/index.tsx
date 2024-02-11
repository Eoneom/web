import React from 'react'

import { useBuilding } from '#building/hook'
import { Building } from '#types'
import { Button } from '#ui/button'
import { hasEnoughResources } from '#city/helper'
import { useRequirement } from '#requirement/hook'
import { useAppSelector } from '#store/type'
import { selectCity } from '#city/slice'

interface Props {
  building: Building
}

export const BuildingDetailsUpgrade: React.FC<Props> = ({ building }) => {
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const city = useAppSelector(selectCity)
  const { isRequirementMet } = useRequirement({ requirement: building.requirement })

  const canBuild = !inProgress &&
    levelsTotal < (city?.maximum_building_levels ?? 0) &&
    hasEnoughResources({ city, cost: building.upgrade_cost }) &&
    isRequirementMet

  return <Button
    disabled={!canBuild}
    onClick={() => upgrade({ code: building.code })}
  >
    Construire
  </Button>
}
