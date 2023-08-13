import React from 'react'
import { Technology } from '#shared/types'
import { UIItem } from '#shared/ui/item'
import { TechnologyTranslations } from '#technology/translations'

interface Props {
  technology: Technology
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentItem: React.FC<Props> = ({ technology, onSelectTechnology }) => {
  const { name } = TechnologyTranslations[technology.code]

  return <UIItem
    name={name}
    level={technology.level}
    onSelect={() => onSelectTechnology(technology)}
  />
}
