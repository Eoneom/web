import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { OutpostGetDataResponse } from '@kroust/swarm-client'

export const getOutpost = async ({ token, outpostId }: { token: string, outpostId: string }): Promise<OutpostGetDataResponse | null> => {
  const res = await client.outpost.get(token, { outpost_id: outpostId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  if (!res.data) {
    toast.warn('data not found')
    return null
  }

  return res.data ?? null
}
