import { toast } from 'react-toastify'

import { CommunicationGetReportDataResponse } from '@kroust/swarm-client'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const getReport = async ({
  token,
  reportId
}: {
  token: string
  reportId: string
}): Promise<CommunicationGetReportDataResponse | null> => {
  const res = await client.communication.getReport(token, { report_id: reportId})
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data ?? null
}
