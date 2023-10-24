import React from 'react'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { ListItemLevel } from '#ui/list/item/level'

interface Props {
  active: boolean
  technology: Technology
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyListItem: React.FC<Props> = ({ active, technology, onSelectTechnology }) => {
  const { name } = TechnologyTranslations[technology.code]

  return <ListItemLevel
    active={active}
    name={name}
    level={technology.level}
    onSelect={() => onSelectTechnology(technology)}
  />
}
