import { toast } from 'react-toastify'
import { TroupListDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const listOutpostTroups = async ({ token, outpostId }: { token: string, outpostId: string }): Promise<TroupListDataResponse | null> => {
  const res = await client.troup.listOutpost(token, { outpost_id: outpostId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
