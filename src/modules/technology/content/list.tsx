import React, { useEffect, useMemo } from 'react'
import { TechnologyContentItem } from '#technology/content/item'
import { useTechnology } from '#technology/hook'
import { Technology } from '#shared/types'

interface Props {
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentList: React.FC<Props> = ({ onSelectTechnology }) => {
  const { technologies, list } = useTechnology()

  useEffect(() => {
    list()
  }, [])

  const is_technology_in_progress: boolean = useMemo(() => {
    return technologies.some(technology => technology.research_at)
  }, [technologies])

  const technology_items = useMemo(() => {
    return technologies.map(technology => <TechnologyContentItem
      onSelectTechnology={onSelectTechnology}
      key={technology.id}
      isTechnologyInProgress={is_technology_in_progress}
      technology={technology}
    />)
  }, [technologies])

  return <>
    <h2>Technologies</h2>
    <div className='list'>
      {technology_items}
    </div>
  </>
}
