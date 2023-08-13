import { toast } from 'react-toastify'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'

export const researchTechnology = async ({
  token,
  cityId,
  code
}: {
  token: string
  cityId: string
  code: string
}) => {
  const res = await client.technology.research(token, {
    city_id: cityId,
    technology_code: code
  })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }

  if (!res.data) {
    toast.error('Pas de data dans la réponse 🤷')
    return null
  }

  toast.success('Recherche lancée')
  return {
    research_at: res.data.research_at
  }
}
