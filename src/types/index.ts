import {
  BuildingGetDataResponse,
  BuildingListDataResponse,
  CityGetDataResponse,
  CommunicationListReportDataResponse,
  TechnologyListDataResponse,
  TroupListDataResponse,
  TroupListMovementDataResponse,
  WorldGetSectorDataResponse,
} from '@kroust/swarm-client'

export type City = CityGetDataResponse
export type Building = BuildingGetDataResponse
export type BuildingItem = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
export type Sector = WorldGetSectorDataResponse & {id: number}
export type Troup = TroupListDataResponse['troups'][number]
export type Movement = TroupListMovementDataResponse['movements'][number]
export type Report = CommunicationListReportDataResponse['reports'][number]
