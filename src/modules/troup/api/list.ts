import { toast } from 'react-toastify'
import { TroupListDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const listTroups = async ({ token, cityId }: { token: string, cityId: string }): Promise<TroupListDataResponse | null> => {
  const res = await client.troup.list(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
