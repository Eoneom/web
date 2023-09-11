import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const technologyFinishResearch = async ({
  token,
}: {
  token: string
}): Promise<{ finished: boolean }> => {
  const res = await client.technology.finishResearch(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return { finished: false }
  }

  return { finished: true }
}
