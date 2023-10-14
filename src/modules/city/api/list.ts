import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { CityListDataResponse } from '@kroust/swarm-client'

export const listCities = async ({ token }: { token: string }): Promise<CityListDataResponse | null> => {
  const res = await client.city.list(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  if (!res.data) {
    toast.warn('data not found')
    return null
  }

  const { data } = res
  if (!data.cities.length) {
    toast.error('there is no city here 😬')
    return null
  }

  return res.data ?? null
}
