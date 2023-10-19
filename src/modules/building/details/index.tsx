import React from 'react'

import { Building } from '#types'
import { BuildingTranslations } from '#building/translations'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'
import { BuildingDetailsMetadata } from '#building/details/metadata'
import { BuildingDetailsUpgrade } from '#building/details/upgrade'

interface Props {
  building: Building
}

export const BuildingDetails: React.FC<Props> = ({ building }) => {
  const { name, description, effect } = BuildingTranslations[building.code]

  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
      <p><strong>{effect}</strong></p>
      <p>{description}</p>
      <BuildingDetailsMetadata building={building} />

    </LayoutDetailsContent>

    <Requirement requirements={building.requirement}/>

    <Cost
      action={<BuildingDetailsUpgrade building={building} />}
      {...building.upgrade_cost}
    />
  </>
}
