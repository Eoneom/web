import React from 'react'

interface Props {
  name: string
  level?: number
  count?: number
  onSelect: () => void
}

export const Item: React.FC<Props> = ({ name, level, count, onSelect }) => {
  return <article className="item" onClick={() => onSelect()}>
    <h4>{name}</h4>
    {level !== undefined && <p>Niveau {level}</p>}
    {count !== undefined && <p>Nombre {count}</p>}
  </article>
}
