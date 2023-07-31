import { BuildingListDataResponse } from '@kroust/swarm-client/dist/endpoints/building/list'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { TechnologyListDataResponse } from '@kroust/swarm-client/dist/endpoints/technology/list'

export type City = SyncDataResponse['cities'][number]
export type Building = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
