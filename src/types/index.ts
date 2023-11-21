import {
  BuildingGetDataResponse,
  BuildingListDataResponse,
  CityGetDataResponse,
  CityListDataResponse,
  CommunicationGetReportDataResponse,
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

export type Technology = TechnologyGetDataResponse
export type TechnologyItem = TechnologyListDataResponse['technologies'][number]

export type Sector = WorldGetSectorDataResponse & { id: number }

export type Troup = TroupListDataResponse['troups'][number]
export type Movement = TroupListMovementDataResponse['movements'][number]

export type Report = CommunicationGetReportDataResponse
export type ReportItem = CommunicationListReportDataResponse['reports'][number]

export type Outpost = OutpostGetDataResponse
export type OutpostItem = OutpostListDataResponse['outposts'][number]
