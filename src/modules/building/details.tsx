import React from 'react'

import { Building } from '#types'
import { BuildingTranslations } from '#building/translations'
import { useBuilding } from '#building/hook'
import { Button } from '#ui/button'
import { useCity } from '#city/hook'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'

interface Props {
  building: Building
}

export const BuildingDetails: React.FC<Props> = ({ building }) => {
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const { city } = useCity()
  const { name } = BuildingTranslations[building.code]

  const canBuild = !inProgress &&
    levelsTotal < (city?.maximum_building_levels ?? 0) &&
    building.upgrade_cost.plastic < (city?.plastic ?? 0) &&
    building.upgrade_cost.mushroom < (city?.mushroom ?? 0)

  const upgradeButton = <Button disabled={!canBuild} onClick={() => upgrade({ code: building.code })}>Construire</Button>

  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
    </LayoutDetailsContent>
    <Requirement requirements={building.requirement}/>
    <Cost action={upgradeButton} {...building.upgrade_cost} />
  </>
}
