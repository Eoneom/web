import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { TechnologyCode, TechnologyGetDataResponse } from '@kroust/swarm-client'

export const getTechnology = async ({
  token,
  cityId,
  technologyCode
}: {
  token: string
  cityId: string
  technologyCode: TechnologyCode
}): Promise<TechnologyGetDataResponse | null> => {
  const res = await client.technology.get(token, { city_id: cityId, technology_code: technologyCode })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
