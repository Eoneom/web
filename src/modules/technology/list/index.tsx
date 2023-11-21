import React, { useMemo } from 'react'

import { TechnologyListItem } from '#technology/list/item'
import { useTechnology } from '#technology/hook'
import { TechnologyTranslations } from '#technology/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#ui/button'
import { List } from '#ui/list'
import { useTimer } from '#hook/timer'

export const TechnologyList: React.FC = () => {
  const { technologies, technology, cancel, inProgress, finishResearch } = useTechnology()
  const { remainingTime } = useTimer({
    onDone: () => finishResearch(),
    doneAt: inProgress?.research_at
  })

  const inProgressComponent = inProgress && <>
    <p>En cours: {TechnologyTranslations[inProgress.code].name} <strong>{formatTime(remainingTime)}</strong></p>
    <Button onClick={() => cancel()}>Annuler</Button>
  </>

  const items = useMemo(() => {
    return technologies.map(technologyItem => <TechnologyListItem
      active={technologyItem.code === technology?.code}
      key={technologyItem.id}
      technologyItem={technologyItem}
    />)
  }, [technology, technologies])

  return <List
    inProgress={inProgressComponent}
    items={items}
  />
}
