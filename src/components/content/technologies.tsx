import React, { useMemo } from 'react'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { ContentTechnology } from './technology'

interface Props {
  technologies: SyncDataResponse['technologies']
  cityId: string
  token: string
}

export const ContentTechnologies: React.FC<Props> = ({ cityId, technologies, token }) => {
  const is_technology_in_progress: boolean = useMemo(() => {
    return technologies.some(technology => technology.research_at)
  }, [technologies])

  const technology_items = useMemo(() => {
    return technologies.map(technology => <ContentTechnology
      key={technology.id}
      cityId={cityId}
      isTechnologyInProgress={is_technology_in_progress}
      technology={technology}
      token={token}/>)
  }, [cityId, technologies])

  return <section>
    <h2>Technologies</h2>
    {technology_items}
  </section>
}
