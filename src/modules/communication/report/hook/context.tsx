import React, { createContext, useState } from 'react'
import { Report } from '#shared/types'

interface ReportContextState {
  reports: Report[]
  setReports: (reports: Report[]) => void
}

export const ReportContext = createContext<ReportContextState>({
  reports: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setReports: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

export const ReportContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [ reports, setReports ] = useState<Report[]>([])
  return (
    <ReportContext.Provider value={{
      reports,
      setReports: (reports: Report[]) => setReports(reports)
    }}>
      {children}
    </ReportContext.Provider>
  )
}
