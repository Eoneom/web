import React, { useMemo } from 'react'

import { TechnologyListItem } from '#technology/list/item'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#ui/button'
import { List } from '#ui/list'

interface Props {
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyList: React.FC<Props> = ({ onSelectTechnology }) => {
  const { technologies, cancel, inProgress } = useTechnology()

  const title = 'Technologies'
  const subtitle = inProgress &&
  <>
    <p>En cours: {TechnologyTranslations[inProgress.code].name} {formatTime(inProgress.remainingTime)}</p>
    <Button onClick={() => cancel()}>Annuler</Button>
  </>
  const items = useMemo(() => {
    return technologies.map(technology => <TechnologyListItem
      onSelectTechnology={onSelectTechnology}
      key={technology.id}
      technology={technology}
    />)
  }, [technologies])

  return <List
    title={title}
    subtitle={subtitle}
    items={items}
  />
}
