import { formatDate } from '#helpers/transform'
import { Report } from '#shared/types'
import React from 'react'

interface Props {
  reports: Report[]
  onSelectReport: (report: Report) => void
}

export const ReportList: React.FC<Props> = ({ reports, onSelectReport }) => {
  return <ul>
    {reports.map(report =>
      <li onClick={() => onSelectReport(report)} key={report.id}>{report.type} {formatDate(report.recorded_at)}</li>
    )}
  </ul>
}
