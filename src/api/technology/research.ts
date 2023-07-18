import { toast } from 'react-toastify'
import { client } from '..'
import { isError } from '../../utils'

export const researchTechnology = async ({
  token,
  city_id,
  technology_code
}: {
  token: string
  city_id?: string
  technology_code: string
}) => {
  if (!city_id) {
    toast.error('no city id defined')
    return
  }

  const upgrade_res = await client.technology.research(token, {
    city_id,
    technology_code
  })
  if (isError(upgrade_res)) {
    toast.error(upgrade_res.error_code)
    return
  }

  toast.success('Recherche lancée')
}
