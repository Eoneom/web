import { toast } from 'react-toastify'
import { TroupListMovementDataResponse } from '@kroust/swarm-client'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'

export const listMovements = async ({ token, cityId }: { token: string, cityId: string }): Promise<TroupListMovementDataResponse | null> => {
  const res = await client.troup.listMovement(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
