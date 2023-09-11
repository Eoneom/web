import React from 'react'

interface Props {
  name: string
  onSelect: () => void
  children?: React.ReactNode
}

export const ListItem: React.FC<Props> = ({ name, onSelect, children }) => {
  return <article className="item" onClick={() => onSelect()}>
    <h4>{name}</h4>
    {children}
  </article>
}
