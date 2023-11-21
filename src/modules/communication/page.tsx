import { LayoutPage } from '#ui/layout/page'
import React, { useEffect } from 'react'
import { ReportList } from '#communication/report/list'
import { useReport } from '#communication/report/hook'
import { ReportExploration } from '#communication/report/exploration'
import { useAuth } from '#auth/hook'

export const ReportPage: React.FC = () => {
  const { reports, report, list } = useReport()
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      return
    }

    list()
  }, [token])

  return <LayoutPage details={report && <ReportExploration report={report}/>}>
    <ReportList reports={reports} />
  </LayoutPage>
}
