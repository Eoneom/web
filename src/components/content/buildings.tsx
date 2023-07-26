import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import React, { useMemo } from 'react'
import { ContentBuilding } from './building'

interface Props {
  city: SyncDataResponse['cities'][number]
  token: string
}

export const ContentBuildings: React.FC<Props> = ({ city, token }) => {
  const isBuildingInProgress = useMemo(() => {
    return city.buildings.some(building => building.upgrade_at)
  }, [city.buildings])

  const building_items = useMemo(() => {
    return city.buildings.map(building => <ContentBuilding
      isBuildingInProgress={isBuildingInProgress}
      key={building.id}
      building={building}
      token={token}
      cityId={city.id}/>)
  }, [city.buildings])

  return <section>
    <h2>Constructions</h2>
    {building_items}
  </section>
}
