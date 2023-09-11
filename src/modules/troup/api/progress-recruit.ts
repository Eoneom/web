import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const progressRecruitTroup = async ({
  token,
  cityId
}: {
  token: string
  cityId: string
}): Promise<{ recruitCount: number }> => {
  const res = await client.troup.progressRecruit(token, { city_id: cityId })
  if (isError(res)) {
    toast.error(res.error_code)
    return { recruitCount: 0 }
  }

  return { recruitCount: res.data?.recruit_count ?? 0}
}
