import { toast } from 'react-toastify'

import { CommunicationCountUnreadReportDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const countUnreadReports = async ({
  token,
}: {
  token: string
}): Promise<CommunicationCountUnreadReportDataResponse | null> => {
  const res = await client.communication.countUnread(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
