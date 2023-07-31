import React, { useMemo } from 'react'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { TechnologyContentItem } from './item'

interface Props {
  technologies: SyncDataResponse['technologies']
  cityId: string
}

export const TechnologyContentList: React.FC<Props> = ({ cityId, technologies }) => {
  const is_technology_in_progress: boolean = useMemo(() => {
    return technologies.some(technology => technology.research_at)
  }, [technologies])

  const technology_items = useMemo(() => {
    return technologies.map(technology => <TechnologyContentItem
      key={technology.id}
      cityId={cityId}
      isTechnologyInProgress={is_technology_in_progress}
      technology={technology}
    />)
  }, [cityId, technologies])

  return <section>
    <h2>Technologies</h2>
    {technology_items}
  </section>
}
