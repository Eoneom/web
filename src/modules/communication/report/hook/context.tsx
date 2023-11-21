/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'
import { Report, ReportItem } from '#types'

interface ReportContextState {
  report: Report | null
  setReport: (report: Report) => void
  reports: ReportItem[]
  setReports: (reports: ReportItem[]) => void
}

export const ReportContext = createContext<ReportContextState>({
  report: null,
  setReport: () => {},

  reports: [],
  setReports: () => {}
})

interface Props {
  children: React.ReactNode
}

export const ReportContextProvider: React.FC<Props> = ({ children }) => {
  const [ report, setReport ] = useState<Report | null>(null)
  const [ reports, setReports ] = useState<ReportItem[]>([])
  return (
    <ReportContext.Provider value={{
      report,
      setReport,

      reports,
      setReports
    }}>
      {children}
    </ReportContext.Provider>
  )
}
