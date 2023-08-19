import {
  BuildingListDataResponse,
  CityListDataResponse,
  TechnologyListDataResponse
} from '@kroust/swarm-client'

export type City = CityListDataResponse['cities'][number]
export type Building = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
