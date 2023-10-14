import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { CityGetDataResponse } from '@kroust/swarm-client'

export const getCity = async ({ token, cityId }: { token: string, cityId: string }): Promise<CityGetDataResponse | null> => {
  const res = await client.city.get(token, { city_id: cityId })
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
