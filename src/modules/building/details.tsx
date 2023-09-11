import React from 'react'

import { Building } from '#types'
import { BuildingTranslations } from '#building/translations'
import { useBuilding } from '#building/hook'
import { LayoutDetails } from '#ui/layout/details'
import { Button } from '#ui/button'
import { useCity } from '#city/hook'

interface Props {
  building?: Building
}

export const BuildingDetails: React.FC<Props> = ({ building }) => {
  const { upgrade, inProgress, levelsTotal } = useBuilding()
  const { selectedCity } = useCity()
  if (!building) {
    return null
  }

  const { name } = BuildingTranslations[building.code]
  const canBuild = !inProgress && levelsTotal < (selectedCity?.maximum_building_levels ?? 0)
  const details = <>
    <h2>{name}</h2>
    {
      canBuild ?
        <Button onClick={() => upgrade({ code: building.code })}>Construire</Button> :
        <>Un bâtiment est déjà en cours ou le maximum de niveau est atteint</>
    }
  </>

  return <LayoutDetails
    itemDetails={details}
    requirements={building.requirement}
    cost={building.upgrade_cost}
  />
}
