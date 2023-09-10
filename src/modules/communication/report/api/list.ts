import { toast } from 'react-toastify'

import { CommunicationListReportDataResponse } from '@kroust/swarm-client'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'

export const listReports = async ({
  token,
}: {
  token: string
}): Promise<CommunicationListReportDataResponse | null> => {
  const res = await client.communication.listReport(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
