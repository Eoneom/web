import React from 'react'
import { displayRemainingTime } from '../../../helpers/transform'
import { useTechnology } from '../hook'
import { useTimer } from '../../../shared/hooks/timer'
import { Technology } from '../../../shared/types'

interface Props {
  technology: Technology
  isTechnologyInProgress: boolean
  cityId: string
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentItem: React.FC<Props> = ({ technology, cityId, isTechnologyInProgress, onSelectTechnology }) => {
  const { list, research } = useTechnology()
  const { remainingTime } = useTimer({ doneAt: technology.research_at, onDone: () => list()})

  return <article>
    <h4 onClick={() => onSelectTechnology(technology)}>{technology.code} {technology.level}</h4>
    {displayRemainingTime(remainingTime)}
    {
      !isTechnologyInProgress &&
      <button onClick={() => {research({ technologyCode: technology.code, cityId })}}>
        Rechercher
      </button>
    }
  </article>
}
