import { Report } from '#types'
import { Details } from '#ui/details'
import { TroupTranslations } from '#troup/translations'
import React from 'react'

interface Props {
  report: Report
}

export const ReportExploration: React.FC<Props> = ({ report }) => {
  const details = <>
    <h1>Exploration</h1>
    <h3>Source: {report.origin.sector};{report.origin.x};{report.origin.y}</h3>
    <h3>Destination: {report.destination.sector};{report.destination.x};{report.destination.y}</h3>
    <h3>Troupes</h3>
    <p>
      <ul>
        {
          report.troups.map(troup => <li key={troup.code}>
            {TroupTranslations[troup.code].name} {troup.count}
          </li>)
        }
      </ul>
    </p>
  </>

  return <Details itemDetails={details}/>
}
