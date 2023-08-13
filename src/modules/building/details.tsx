import React from 'react'

import { Building } from '#shared/types'
import { BuildingTranslations } from '#building/translations'
import { useBuilding } from '#building/hook'
import { Details } from '#shared/ui/details'
import { Button } from '#shared/ui/button'

interface Props {
  building: Building
}

export const BuildingDetails: React.FC<Props> = ({ building }) => {
  const { name } = BuildingTranslations[building.code]
  const { upgrade, inProgress } = useBuilding()

  const details = <>
    <h2>{name}</h2>
    {!inProgress && <Button onClick={() => upgrade({ code: building.code })}>Construire</Button>}
  </>

  return <Details
    itemDetails={details}
    plasticCost={building.upgrade_cost.plastic}
    mushroomCost={building.upgrade_cost.mushroom}
    durationCost={building.upgrade_cost.duration}
  />
}
