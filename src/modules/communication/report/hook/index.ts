import { useContext } from 'react'
import { Report, ReportItem } from '#types'
import { useAuth } from '#auth/hook'
import { listReports } from '#communication/report/api/list'
import { ReportContext } from '#communication/report/hook/context'
import { getReport } from '#communication/report/api/get'

interface HookUseReport {
  report: Report | null
  select: (params: SelectParams) => void

  reports: ReportItem[]
  list: () => Promise<void>
}

interface SelectParams {
  reportId: string
}

export const useReport = (): HookUseReport => {
  const { reports, setReports, report, setReport } = useContext(ReportContext)
  const { token } = useAuth()

  const select = async ({ reportId }: SelectParams) => {
    const data = await getReport({ token, reportId })
    if (!data) {
      return
    }

    setReport(data)
  }

  const list = async () => {
    const data = await listReports({ token })
    if (!data) {
      return
    }

    setReports(data.reports)
  }

  return {
    report,
    select,

    reports,
    list,
  }
}
