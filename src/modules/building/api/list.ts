import { toast } from 'react-toastify'

import { BuildingListDataResponse } from '@kroust/swarm-client'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'

export const listBuildings = async ({
  token,
  cityId,
}: {
  token: string
  cityId: string
}): Promise<BuildingListDataResponse | null> => {
  const res = await client.building.list(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
