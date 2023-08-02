import { BuildingListDataResponse } from '@kroust/swarm-client'
import { SyncDataResponse } from '@kroust/swarm-client'
import { TechnologyListDataResponse } from '@kroust/swarm-client'

export type City = SyncDataResponse['cities'][number]
export type Building = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
