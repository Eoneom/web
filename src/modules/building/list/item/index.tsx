import React from 'react'

import { Building } from '#types'
import { BuildingTranslations } from '#building/translations'
import { ListItemLevel } from '#ui/list/item/level'

interface Props {
  building: Building
  onSelectBuilding: (building: Building) => void
}

export const BuildingListItem: React.FC<Props> = ({ building, onSelectBuilding }) => {
  const { name } = BuildingTranslations[building.code]

  return <ListItemLevel
    name={name}
    level={building.level}
    onSelect={() => onSelectBuilding(building)}
  />
}
