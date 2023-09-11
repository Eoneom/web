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
  const { selectedCity } = useCity()
  const { name } = BuildingTranslations[building.code]
  const canBuild = !inProgress && levelsTotal < (selectedCity?.maximum_building_levels ?? 0)

  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
      {
        canBuild ?
          <Button onClick={() => upgrade({ code: building.code })}>Construire</Button> :
          <>Un bâtiment est déjà en cours ou le maximum de niveau est atteint</>
      }
    </LayoutDetailsContent>
    <Requirement requirements={building.requirement}/>
    <Cost {...building.upgrade_cost} />
  </>
}
