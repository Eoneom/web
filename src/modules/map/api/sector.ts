import { toast } from 'react-toastify'
import { WorldGetSectorDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const getSector = async ({ token, sector }: { token: string, sector: number }): Promise<WorldGetSectorDataResponse | null> => {
  const res = await client.world.getSector(token, { sector })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
