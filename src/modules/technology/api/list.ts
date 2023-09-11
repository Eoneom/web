import { toast } from 'react-toastify'
import { TechnologyListDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const listTechnologies = async ({ token, cityId }: { token: string, cityId: string }): Promise<TechnologyListDataResponse | null> => {
  const res = await client.technology.list(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
