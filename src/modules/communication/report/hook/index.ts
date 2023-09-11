import { useContext, useEffect } from 'react'
import { Report } from '#types'
import { useAuth } from '#auth/hook'
import { listReports } from '#communication/report/api/list'
import { ReportContext } from '#communication/report/hook/context'

interface HookUseReport {
  reports: Report[]
  list: () => Promise<void>
}

export const useReport = (): HookUseReport => {
  const { reports, setReports } = useContext(ReportContext)
  const { token } = useAuth()

  const list = async () => {
    const data = await listReports({ token })
    if (!data) {
      return
    }

    setReports(data.reports)
  }

  useEffect(() => {
    list()
  }, [])

  return {
    reports,
    list,
  }
}
