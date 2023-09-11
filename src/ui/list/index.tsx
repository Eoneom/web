import React from 'react'

interface Props {
  title: string
  subtitle?: React.ReactNode
  items: React.ReactNode
}

export const List: React.FC<Props> = ({ title, subtitle, items }) => {
  return <>
    <h2>{title}</h2>
    {subtitle}
    <div className='list'>
      {items}
    </div>
  </>
}
