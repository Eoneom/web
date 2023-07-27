import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'

export type City = SyncDataResponse['cities'][number]
export type Building = City['buildings'][number]
export type Technology = SyncDataResponse['technologies'][number]
