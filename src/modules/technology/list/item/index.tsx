import React from 'react'
import { Technology } from '#types'
import { Item } from '#ui/item'
import { TechnologyTranslations } from '#technology/translations'

interface Props {
  technology: Technology
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyListItem: React.FC<Props> = ({ technology, onSelectTechnology }) => {
  const { name } = TechnologyTranslations[technology.code]

  return <Item
    name={name}
    level={technology.level}
    onSelect={() => onSelectTechnology(technology)}
  />
}
