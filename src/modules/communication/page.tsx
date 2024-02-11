import { LayoutPage } from '#ui/layout/page'
import React, { useEffect } from 'react'
import { ReportList } from '#communication/report/list'
import { useReport } from '#communication/report/hook'
import { ReportExploration } from '#communication/report/exploration'
import { useAppSelector } from '#store/type'
import { selectToken } from '#auth/slice'

export const ReportPage: React.FC = () => {
  const { reports, report, list } = useReport()
  const token = useAppSelector(selectToken)

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
