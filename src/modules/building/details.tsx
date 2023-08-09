import React from 'react'

import { Building } from '#shared/types'
import { transformDecimals } from '#helpers/transform'
import { BuildingTranslations } from '#building/translations'

interface Props {
  building: Building
}

export const BuildingDetails: React.FC<Props> = ({ building }) => {
  const { name } = BuildingTranslations[building.code]
  return <>
    <aside><h3>Pré-requis</h3></aside>
    <article><h2>{name}</h2></article>
    <aside>
      <h3>Coût</h3>
      <ul>
        <li>Plastique: {transformDecimals(building.upgrade_cost.plastic)}</li>
        <li>Champignon: {transformDecimals(building.upgrade_cost.mushroom)}</li>
        <li>Durée: {building.upgrade_cost.duration}</li>
      </ul>
    </aside>
  </>
}
