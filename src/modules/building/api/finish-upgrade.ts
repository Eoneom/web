import { toast } from 'react-toastify'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'

export const buildingFinishUpgrade = async ({
  token,
  cityId,
}: {
  token: string
  cityId: string
}): Promise<{ finished: boolean }> => {
  const res = await client.building.finishUpgrade(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return { finished: false }
  }

  return { finished: true }
}
