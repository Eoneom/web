import { toast } from 'react-toastify'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'

export const upgradeBuilding = async ({
  token,
  cityId,
  buildingCode
}: {
  token: string
  cityId: string
  buildingCode: string
}): Promise<{ upgrade_at: number } | null> => {
  const res = await client.building.upgrade(token, {
    city_id: cityId,
    building_code: buildingCode
  })
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  if (!res.data) {
    toast.error('Pas de data dans la réponse 🤷')
    return null
  }

  toast.success('Construction lancée')
  return {
    upgrade_at: res.data.upgrade_at
  }
}
