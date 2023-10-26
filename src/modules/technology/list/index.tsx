import React, { useMemo } from 'react'

import { TechnologyListItem } from '#technology/list/item'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#ui/button'
import { List } from '#ui/list'

interface Props {
  selectedTechnologyCode?: string
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyList: React.FC<Props> = ({ selectedTechnologyCode, onSelectTechnology }) => {
  const { technologies, cancel, inProgress } = useTechnology()

  const inProgressComponent = inProgress && <>
    <p>En cours: {TechnologyTranslations[inProgress.code].name} <strong>{formatTime(inProgress.remainingTime)}</strong></p>
    <Button onClick={() => cancel()}>Annuler</Button>
  </>
  const items = useMemo(() => {
    return technologies.map(technology => <TechnologyListItem
      active={technology.code === selectedTechnologyCode}
      onSelectTechnology={onSelectTechnology}
      key={technology.id}
      technology={technology}
    />)
  }, [selectedTechnologyCode, technologies])

  return <List
    inProgress={inProgressComponent}
    items={items}
  />
}
