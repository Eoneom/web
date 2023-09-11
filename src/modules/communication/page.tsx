import { LayoutPage } from '#ui/layout/page'
import React, { useMemo, useState } from 'react'
import { ReportList } from '#communication/report/list'
import { useReport } from '#communication/report/hook'
import { ReportExploration } from '#communication/report/exploration'

export const ReportPage: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState('')
  const { reports } = useReport()

  const selectedReport = useMemo(() => {
    return reports.find(report => report.id === selectedReportId)
  }, [reports, selectedReportId])

  return <LayoutPage
    content={<ReportList reports={reports} onSelectReport={({id}) => setSelectedReportId(id)}/>}
    details={selectedReport && <ReportExploration report={selectedReport}/>}
    displayDetails={Boolean(selectedReport)}
  />
}
