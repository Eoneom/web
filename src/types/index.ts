import {
  BuildingListDataResponse,
  TechnologyListDataResponse,
  TroupListDataResponse,
  TroupListMovementDataResponse,
  WorldGetSectorDataResponse,
  CommunicationListReportDataResponse,
  CityGetDataResponse
} from '@kroust/swarm-client'

export type City = CityGetDataResponse
export type Building = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
export type Sector = WorldGetSectorDataResponse & {id: number}
export type Troup = TroupListDataResponse['troups'][number]
export type Movement = TroupListMovementDataResponse['movements'][number]
export type Report = CommunicationListReportDataResponse['reports'][number]
