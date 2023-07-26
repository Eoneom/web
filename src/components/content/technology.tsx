import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import React from 'react'
import { displayRemainingTime } from '../../helpers/transform'
import { researchTechnology } from '../../api/technology/research'

interface Props {
  technology: SyncDataResponse['technologies'][number]
  isTechnologyInProgress: boolean
  token: string
  cityId: string
}

export const ContentTechnology: React.FC<Props> = ({ technology,token, cityId, isTechnologyInProgress }) => {
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
