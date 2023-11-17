import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { OutpostListDataResponse } from '@kroust/swarm-client'

export const listOutposts = async ({ token }: { token: string }): Promise<OutpostListDataResponse | null> => {
  const res = await client.outpost.list(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  if (!res.data) {
    toast.warn('data not found')
    return null
  }

  const { data } = res
  if (!data.outposts.length) {
    toast.error('there is no city here 😬')
    return null
  }

  return res.data ?? null
}
