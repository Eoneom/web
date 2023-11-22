import { useReport } from '#communication/report/hook'
import { formatDate } from '#helpers/transform'
import { ReportItem } from '#types'
import classNames from 'classnames'
import React from 'react'

interface Props {
  reports: ReportItem[]
}

export const ReportList: React.FC<Props> = ({ reports }) => {
  const { select } = useReport()

  return <ul>
    {reports.map(report =>
      <li onClick={() => select({ reportId: report.id })} key={report.id} className={classNames({'unread': !report.was_read})}>
        {report.type} {formatDate(report.recorded_at)}
      </li>
    )}
  </ul>
}
