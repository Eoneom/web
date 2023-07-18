import { toast } from 'react-toastify'
import { client } from '..'
import { isError } from '../../utils'

export const upgradeBuilding = async ({
  token,
  city_id,
  building_code
}: {
  token: string
  city_id?: string
  building_code: string
}) => {
  if (!city_id) {
    toast.error('no city id defined')
    return
  }

  const upgrade_res = await client.building.upgrade(token, {
    city_id,
    building_code
  })
  if (isError(upgrade_res)) {
    toast.error(upgrade_res.error_code)
    return
  }

  toast.success('Construction lancée')
}
