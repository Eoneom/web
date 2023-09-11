import { toast } from 'react-toastify'
import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const troupExplore = async ({
  token,
  cityId,
  coordinates
}: {
   token: string
  cityId: string
  coordinates: { x: number, y: number, sector: number }
}): Promise<void> => {
  const res = await client.troup.explore(token, { city_id: cityId, coordinates })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }

  toast.success('Exploration lancée')
}
