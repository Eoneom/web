import React, { useEffect, useMemo } from 'react'
import { TechnologyContentItem } from './item'
import { useTechnology } from '../hook'
import { Technology } from '../../../shared/types'

interface Props {
  cityId: string
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentList: React.FC<Props> = ({ cityId, onSelectTechnology }) => {
  const { technologies, list } = useTechnology()

  useEffect(() => {
    list({ cityId })
  }, [])

  const is_technology_in_progress: boolean = useMemo(() => {
    return technologies.some(technology => technology.research_at)
  }, [technologies])

  const technology_items = useMemo(() => {
    return technologies.map(technology => <TechnologyContentItem
      onSelectTechnology={onSelectTechnology}
      key={technology.id}
      cityId={cityId}
      isTechnologyInProgress={is_technology_in_progress}
      technology={technology}
    />)
  }, [cityId, technologies])

  return <>
    <h2>Technologies</h2>
    <div className='list'>
      {technology_items}
    </div>
  </>
}
