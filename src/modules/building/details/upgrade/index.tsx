import React, { useMemo } from 'react'

import { useBuilding } from '#building/hook'
import { useCity } from '#city/hook'
import { Building } from '#types'
import { Button } from '#ui/button'
import { hasEnoughResources } from '#city/helper'
import { useTechnology } from '#technology/hook'
import { areRequirementsMet } from '#requirement/helper'

interface Props {
  building: Building
}

export const BuildingDetailsUpgrade: React.FC<Props> = ({ building }) => {
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const { city } = useCity()
  const { buildings } = useBuilding()
  const { technologies } = useTechnology()

  const requirementsMet = useMemo(() => {
    return areRequirementsMet({
      requirement: building.requirement,
      buildings,
      technologies
    })
  }, [buildings, technologies, building.requirement])

  const canBuild = !inProgress &&
    levelsTotal < (city?.maximum_building_levels ?? 0) &&
    hasEnoughResources({ city, cost: building.upgrade_cost }) &&
    requirementsMet

  return <Button
    disabled={!canBuild}
    onClick={() => upgrade({ code: building.code })}
  >
    Construire
  </Button>
}
