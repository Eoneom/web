import React from 'react'

interface Props {
  name: string
  level: number
  onSelect?: () => void
}

export const UIItem: React.FC<Props> = ({ name, level, onSelect }) => {
  return <article className="item" onClick={() => onSelect && onSelect()}>
    <h4>{name}</h4>
    <p>Niveau {level}</p>
  </article>
}
