import {
  BuildingGetDataResponse,
  BuildingListDataResponse,
  CityGetDataResponse,
  CityListDataResponse,
  CommunicationListReportDataResponse,
  OutpostGetDataResponse,
  OutpostListDataResponse,
  TechnologyGetDataResponse,
  TechnologyListDataResponse,
  TroupListDataResponse,
  TroupListMovementDataResponse,
  WorldGetSectorDataResponse,
} from '@kroust/swarm-client'

export type City = CityGetDataResponse
export type CityItem = CityListDataResponse['cities'][number]
export type Building = BuildingGetDataResponse
export type BuildingItem = BuildingListDataResponse['buildings'][number]
export type TechnologyItem = TechnologyListDataResponse['technologies'][number]
export type Technology = TechnologyGetDataResponse
export type Sector = WorldGetSectorDataResponse & { id: number }
export type Troup = TroupListDataResponse['troups'][number]
export type Movement = TroupListMovementDataResponse['movements'][number]
export type Report = CommunicationListReportDataResponse['reports'][number]
export type OutpostItem = OutpostListDataResponse['outposts'][number]
export type Outpost = OutpostGetDataResponse
