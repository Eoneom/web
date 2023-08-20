import {
  BuildingListDataResponse,
  CityListDataResponse,
  TechnologyListDataResponse,
  WorldGetSectorDataResponse
} from '@kroust/swarm-client'

export type City = CityListDataResponse['cities'][number]
export type Building = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
export type Sector = WorldGetSectorDataResponse & {id: number}
