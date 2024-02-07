import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const finishMovement = async ({ token }: { token: string }): Promise<void> => {
  const res = await client.troup.finishMovement(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }
}
