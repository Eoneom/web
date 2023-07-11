import { toast } from 'react-toastify'
import { client } from '..'
import { isError } from '../../utils'

export const upgradeBuilding = async ({
  player_id,
  city_id,
  building_code
}: {
  player_id: string
  city_id?: string
  building_code: string
}) => {
  if (!city_id) {
    toast('no city id defined')
    return
  }

  const upgrade_res = await client.building.upgrade({
    player_id,
    city_id,
    building_code
  })
  if (isError(upgrade_res)) {
    toast(upgrade_res.error_code)
    return
  }

  toast('upgrade in progress')
}
