import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { BuildingCode } from '@kroust/swarm-client'

export const upgradeBuilding = async ({
  token,
  cityId,
  code
}: {
  token: string
  cityId: string
  code: BuildingCode
}): Promise<{ upgrade_at: number } | null> => {
  const res = await client.building.upgrade(token, {
    city_id: cityId,
    building_code: code
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
