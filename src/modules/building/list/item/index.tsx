import React from 'react'

import { Building } from '#types'
import { Item } from '#ui/item'
import { BuildingTranslations } from '#building/translations'

interface Props {
  building: Building
  onSelectBuilding: (building: Building) => void
}

export const BuildingListItem: React.FC<Props> = ({ building, onSelectBuilding }) => {
  const { name } = BuildingTranslations[building.code]

  return <Item
    name={name}
    level={building.level}
    onSelect={() => onSelectBuilding(building)}
  />
}
