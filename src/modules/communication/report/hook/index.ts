import { useContext, useEffect } from 'react'
import { Report } from '#shared/types'
import { useAuth } from '#auth/hook'
import { listReports } from '../api/list'
import { ReportContext } from './context'

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
