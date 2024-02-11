import { useContext } from 'react'
import { Report, ReportItem } from '#types'
import { listReports } from '#communication/report/api/list'
import { ReportContext } from '#communication/report/hook/context'
import { getReport } from '#communication/report/api/get'
import { countUnreadReports } from '#communication/report/api/count-unread'
import { markReport } from '#communication/report/api/mark'
import { useAppSelector } from '#store/type'
import { selectToken } from '#auth/slice'

interface HookUseReport {
  report: Report | null
  select: (params: SelectParams) => void

  reports: ReportItem[]
  list: () => Promise<void>

  unreadCount: number
  countUnread: () => Promise<void>
}

interface SelectParams {
  reportId: string
}

export const useReport = (): HookUseReport => {
  const { reports, setReports, report, setReport, unreadCount, setUnreadCount } = useContext(ReportContext)
  const token = useAppSelector(selectToken)

  const markReportAsReadAndRefresh = async ({ reportId }: { reportId: string }) => {
    if (!token) {
      return
    }

    await markReport({ token, reportId, wasRead: true })
    await list()
    await countUnread()
  }

  const select = async ({ reportId }: SelectParams) => {
    if (!token) {
      return
    }

    const data = await getReport({ token, reportId })
    if (!data) {
      return
    }

    setReport(data)

    if (!data.was_read) {
      markReportAsReadAndRefresh({ reportId })
    }
  }

  const list = async () => {
    if (!token) {
      return
    }

    const data = await listReports({ token })
    if (!data) {
      return
    }

    setReports(data.reports)
  }

  const countUnread = async () => {
    if (!token) {
      return
    }

    const data = await countUnreadReports({ token })
    if (!data) {
      return
    }

    setUnreadCount(data.count)
  }

  return {
    report,
    select,

    reports,
    list,

    unreadCount,
    countUnread
  }
}
