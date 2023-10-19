import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { TechnologyCode } from '@kroust/swarm-client'

export const researchTechnology = async ({
  token,
  cityId,
  code
}: {
  token: string
  cityId: string
  code: TechnologyCode
}) => {
  const res = await client.technology.research(token, {
    city_id: cityId,
    technology_code: code
  })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }
}
