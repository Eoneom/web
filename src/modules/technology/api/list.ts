import { toast } from 'react-toastify'
import { client } from '../../../shared/api'
import { isError } from '../../../helpers/assertion'
import { TechnologyListDataResponse } from '@kroust/swarm-client'

export const listTechnologies = async ({ token, cityId }: { token: string, cityId: string }): Promise<TechnologyListDataResponse | null> => {
  const res = await client.technology.list(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
