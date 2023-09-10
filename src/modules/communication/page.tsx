import { PageLayout } from '#shared/layout/page'
import React, { useMemo, useState } from 'react'
import { ReportList } from './report/list'
import { useReport } from './report/hook'
import { ReportExploration } from './report/exploration'

export const ReportPage: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState('')
  const { reports } = useReport()

  const selectedReport = useMemo(() => {
    return reports.find(report => report.id === selectedReportId)
  }, [reports, selectedReportId])

  return <PageLayout
    content={<ReportList reports={reports} onSelectReport={({id}) => setSelectedReportId(id)}/>}
    details={selectedReport && <ReportExploration report={selectedReport}/>}
    displayDetails={Boolean(selectedReport)}
  />
}
