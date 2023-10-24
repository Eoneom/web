import { toast } from 'react-toastify'

import { TroupCode } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const recruitTroup = async ({
  token,
  cityId,
  code,
  count
}: {
  token: string
  cityId: string
  code: TroupCode
  count: number
}) => {
  const res = await client.troup.recruit(token, {
    city_id: cityId,
    troup_code: code,
    count
  })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }
}
