import { toast } from 'react-toastify'

import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const markReport = async ({
  token,
  reportId,
  wasRead
}: {
  token: string
  reportId: string
  wasRead: boolean
}): Promise<void> => {
  const res = await client.communication.markReport(token, { report_id: reportId, was_read: wasRead })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }
}
