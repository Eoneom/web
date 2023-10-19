import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { BuildingCode } from '@kroust/swarm-client'

export const upgradeBuilding = async ({
  token,
  cityId,
  code
}: {
  token: string
  cityId: string
  code: BuildingCode
}): Promise<void> => {
  const res = await client.building.upgrade(token, {
    city_id: cityId,
    building_code: code
  })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }
}
