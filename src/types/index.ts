import {
  TechnologyListDataResponse,
  TroupListDataResponse,
  TroupListMovementDataResponse,
  WorldGetSectorDataResponse,
  CommunicationListReportDataResponse,
  CityGetDataResponse,
  BuildingListDataResponse
} from '@kroust/swarm-client'
import { BuildingGetDataResponse } from '@kroust/swarm-client/dist/client/src/endpoints/building/get'

export type City = CityGetDataResponse
export type Building = BuildingGetDataResponse
export type BuildingItem = BuildingListDataResponse['buildings'][number]
export type Technology = TechnologyListDataResponse['technologies'][number]
export type Sector = WorldGetSectorDataResponse & {id: number}
export type Troup = TroupListDataResponse['troups'][number]
export type Movement = TroupListMovementDataResponse['movements'][number]
export type Report = CommunicationListReportDataResponse['reports'][number]
