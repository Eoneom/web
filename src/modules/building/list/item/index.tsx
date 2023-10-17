import React from 'react'

import { BuildingItem } from '#types'
import { BuildingTranslations } from '#building/translations'
import { ListItemLevel } from '#ui/list/item/level'
import { useBuilding } from '#building/hook'

interface Props {
  buildingItem: BuildingItem
}

export const BuildingListItem: React.FC<Props> = ({ buildingItem }) => {
  const { select } = useBuilding()
  const { name } = BuildingTranslations[buildingItem.code]

  return <ListItemLevel
    name={name}
    level={buildingItem.level}
    onSelect={() => select({ code: buildingItem.code })}
  />
}
