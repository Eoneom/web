import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import React from 'react'
import { displayRemainingTime } from '../../helpers/transform'
import { upgradeBuilding } from '../../api/building/upgrade'

interface Props {
  building: SyncDataResponse['cities'][number]['buildings'][number]
  cityId: string
  token: string
  isBuildingInProgress: boolean
}

export const ContentBuilding: React.FC<Props> = ({ building, cityId, token, isBuildingInProgress }) => {
  return <article key={building.code}>
    {building.name} {building.level}
    {displayRemainingTime(building.upgrade_at)} {
      !isBuildingInProgress && <button onClick={() => {
        upgradeBuilding({ token, city_id: cityId, building_code: building.code })
      } }>
        Construire
      </button>}
  </article>
}
