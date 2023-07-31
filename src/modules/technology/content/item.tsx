import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import React from 'react'
import { displayRemainingTime } from '../../../helpers/transform'
import { researchTechnology } from '../../../api/technology/research'
import { useAuth } from '../../auth/hook'

interface Props {
  technology: SyncDataResponse['technologies'][number]
  isTechnologyInProgress: boolean
  cityId: string
}

export const TechnologyContentItem: React.FC<Props> = ({ technology, cityId, isTechnologyInProgress }) => {
  const { token } = useAuth()
  return <article>
    {technology.code} {technology.level} {displayRemainingTime(technology.research_at)} {
      !isTechnologyInProgress && <button onClick={() => {
        researchTechnology({
          token,
          city_id: cityId,
          technology_code: technology.code
        })
      }}>Rechercher</button>
    }
  </article>
}
