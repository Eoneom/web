import { toast } from 'react-toastify'
import { client } from '../../../shared/api'
import { isError } from '../../../helpers/assertion'

export const cancelBuilding = async ({
  token,
  cityId,
}: {
  token: string
  cityId: string
}): Promise<void> => {
  const res = await client.building.cancel(token, {city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }

  toast.success('Construction annulée')
}
