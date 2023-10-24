import React from 'react'

import { BuildingItem } from '#types'
import { BuildingTranslations } from '#building/translations'
import { ListItemLevel } from '#ui/list/item/level'
import { useBuilding } from '#building/hook'

interface Props {
  buildingItem: BuildingItem
  active: boolean
}

export const BuildingListItem: React.FC<Props> = ({ buildingItem, active }) => {
  const { select } = useBuilding()
  const { name } = BuildingTranslations[buildingItem.code]

  return <ListItemLevel
    name={name}
    active={active}
    level={buildingItem.level}
    onSelect={() => select({ code: buildingItem.code })}
  />
}
