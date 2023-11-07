import React from 'react'
import { TechnologyItem } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { ListItemLevel } from '#ui/list/item/level'
import { useTechnology } from '#technology/hook'

interface Props {
  active: boolean
  technologyItem: TechnologyItem
}

export const TechnologyListItem: React.FC<Props> = ({ active, technologyItem }) => {
  const { select } = useTechnology()
  const { name } = TechnologyTranslations[technologyItem.code]

  return <ListItemLevel
    active={active}
    name={name}
    level={technologyItem.level}
    onSelect={() => select({ code: technologyItem.code })}
  />
}
