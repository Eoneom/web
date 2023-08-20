import { toast } from 'react-toastify'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'
import { CityGatherDataResponse } from '@kroust/swarm-client'

export const cityGather = async ({
  token,
  cityId
}: {
  token: string
  cityId: string
}): Promise<CityGatherDataResponse | null> => {
  const res = await client.city.gather(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  if (!res.data) {
    toast.warn('data not found')
    return null
  }

  const { data } = res
  return data ?? null
}
