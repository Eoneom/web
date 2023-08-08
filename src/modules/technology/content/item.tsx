import React from 'react'
import { useTechnology } from '../hook'
import { useTimer } from '../../../shared/hooks/timer'
import { Technology } from '../../../shared/types'
import { UIItem } from '../../../shared/ui/item'
import { TechnologyTranslations } from '../translations'

interface Props {
  technology: Technology
  isTechnologyInProgress: boolean
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentItem: React.FC<Props> = ({ technology, isTechnologyInProgress, onSelectTechnology }) => {
  const { list, research, cancel } = useTechnology()
  const { remainingTime, reset } = useTimer({ doneAt: technology.research_at, onDone: () => list()})
  const { name } = TechnologyTranslations[technology.code]

  return <UIItem
    title={`${name} ${technology.level}`}
    onTitleClick={() => onSelectTechnology(technology)}
    time={ remainingTime || technology.research_cost.duration}
    action={<>
      {
        !isTechnologyInProgress &&
        <button onClick={async () => research({ technologyCode: technology.code })}>
          Rechercher
        </button>
      }

      {
        technology.research_at &&
        <button onClick={async () => { await cancel(); reset() }}>
          Annuler
        </button>
      }
    </>}
  />
}
