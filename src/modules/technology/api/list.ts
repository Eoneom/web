import { toast } from 'react-toastify'
import { TechnologyListDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const listTechnologies = async ({ token }: { token: string }): Promise<TechnologyListDataResponse | null> => {
  const res = await client.technology.list(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
