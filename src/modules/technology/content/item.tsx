import React from 'react'
import { useTechnology } from '../hook'
import { useTimer } from '../../../shared/hooks/timer'
import { Technology } from '../../../shared/types'
import { UIItem } from '../../../shared/ui/item'
import { TechnologyTranslations } from '../translations'

interface Props {
  technology: Technology
  isTechnologyInProgress: boolean
  cityId: string
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentItem: React.FC<Props> = ({ technology, cityId, isTechnologyInProgress, onSelectTechnology }) => {
  const { list, research } = useTechnology()
  const { remainingTime } = useTimer({ doneAt: technology.research_at, onDone: () => list({ cityId })})
  const { name } = TechnologyTranslations[technology.code]

  return <UIItem
    title={`${name} ${technology.level}`}
    onTitleClick={() => onSelectTechnology(technology)}
    time={ remainingTime || technology.research_cost.duration}
    action={
      !isTechnologyInProgress &&
       <button onClick={async () => research({ cityId, technologyCode: technology.code })}>
         Rechercher
       </button>
    }
  />
}
