import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const cityGather = async ({
  token,
  cityId
}: {
  token: string
  cityId: string
}): Promise<void> => {
  const res = await client.city.gather(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }
}
