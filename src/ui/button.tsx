import React from 'react'

interface Props {
  onClick?: () => void
  children: React.ReactNode
}

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return <button onClick={() => onClick ? onClick() : null}>
    {children}
  </button>
}
