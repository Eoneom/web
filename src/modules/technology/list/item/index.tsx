import React from 'react'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { ListItemLevel } from '#ui/list/item/level'

interface Props {
  technology: Technology
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyListItem: React.FC<Props> = ({ technology, onSelectTechnology }) => {
  const { name } = TechnologyTranslations[technology.code]

  return <ListItemLevel
    name={name}
    level={technology.level}
    onSelect={() => onSelectTechnology(technology)}
  />
}
