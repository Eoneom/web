/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Report, ReportItem } from '#types'

interface ReportContextState {
  report: Report | null
  setReport: (report: Report) => void

  reports: ReportItem[]
  setReports: (reports: ReportItem[]) => void

  unreadCount: number
  setUnreadCount: (count: number) => void
}

export const ReportContext = createContext<ReportContextState>({
  report: null,
  setReport: () => {},

  reports: [],
  setReports: () => {},

  unreadCount: 0,
  setUnreadCount: () => {}
})

interface Props {
  children: React.ReactNode
}

export const ReportContextProvider: React.FC<Props> = ({ children }) => {
  const [ report, setReport ] = useState<Report | null>(null)
  const [ reports, setReports ] = useState<ReportItem[]>([])
  const [ unreadCount, setUnreadCount ] = useState<number>(0)
  return (
    <ReportContext.Provider value={{
      report,
      setReport,

      reports,
      setReports,

      unreadCount,
      setUnreadCount
    }}>
      {children}
    </ReportContext.Provider>
  )
}
