import { toast } from 'react-toastify'
import { TroupGetMovementDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const getMovement = async ({ token, movementId }: { token: string, movementId: string }): Promise<TroupGetMovementDataResponse | null> => {
  const res = await client.troup.getMovement(token, { movement_id: movementId})
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
