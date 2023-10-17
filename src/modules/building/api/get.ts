import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { BuildingCode, BuildingGetDataResponse } from '@kroust/swarm-client'

export const getBuilding = async ({
  token,
  cityId,
  buildingCode
}: {
  token: string
  cityId: string
  buildingCode: BuildingCode
}): Promise<BuildingGetDataResponse | null> => {
  const res = await client.building.get(token, { city_id: cityId, building_code: buildingCode })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
