import React from 'react'

import { Building } from '#shared/types'
import { UIItem } from '#shared/ui/item'
import { BuildingTranslations } from '#building/translations'

interface Props {
  building: Building
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentItem: React.FC<Props> = ({ building, onSelectBuilding }) => {
  const { name } = BuildingTranslations[building.code]

  return <UIItem
    name={name}
    level={building.level}
    onSelect={() => onSelectBuilding(building)}
  />
}
