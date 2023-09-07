import React from 'react'

import { Building } from '#shared/types'
import { BuildingTranslations } from '#building/translations'
import { useBuilding } from '#building/hook'
import { Details } from '#shared/ui/details'
import { Button } from '#shared/ui/button'
import { useCity } from '#city/hook'

interface Props {
  building: Building
}

export const BuildingDetails: React.FC<Props> = ({ building }) => {
  const { name } = BuildingTranslations[building.code]
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const { selectedCity } = useCity()
  const canBuild = !inProgress && levelsTotal < (selectedCity?.maximum_building_levels ?? 0)

  const details = <>
    <h2>{name}</h2>
    {
      canBuild ?
        <Button onClick={() => upgrade({ code: building.code })}>Construire</Button> :
        <>Un bâtiment est déjà en cours ou le maximum de niveau est atteint</>
    }
  </>

  return <Details
    itemDetails={details}
    requirements={building.requirement}
    plasticCost={building.upgrade_cost.plastic}
    mushroomCost={building.upgrade_cost.mushroom}
    durationCost={building.upgrade_cost.duration}
  />
}
