import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const finishMovement = async ({ token, movementId }: { token: string, movementId: string }): Promise<void> => {
  const res = await client.troup.finishMovement(token, { movement_id: movementId })
  if (isError(res)) {
    toast.error(res.error_code)
  }
}
