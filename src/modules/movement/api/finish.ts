import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const finishMovement = async ({ token }: { token: string }): Promise<{ isOutpostCreated: boolean }> => {
  const res = await client.troup.finishMovement(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return { isOutpostCreated: false }
  }

  return { isOutpostCreated: Boolean(res.data?.is_outpost_created) }
}
