import { toast } from 'react-toastify'
import { client } from '../../../shared/api'
import { isError } from '../../../helpers/assertion'
import { TechnologyListDataResponse } from '@kroust/swarm-client/dist/endpoints/technology/list'

export const listTechnologies = async ({ token }: { token: string }): Promise<TechnologyListDataResponse | null> => {
  const res = await client.technology.list(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
