import React from 'react'

interface Props {
  displayDetails: boolean
  content: React.ReactNode
  details: React.ReactNode
}

export const LayoutPage: React.FC<Props> = ({ displayDetails, details, content }) => {
  return <>
    <section id="content" className={displayDetails ? 'details-enabled': ''}>
      {content}
    </section>
    {displayDetails && <section id="details">{details}</section>}
  </>
}
