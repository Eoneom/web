import React from 'react'
import { formatTime } from '#helpers/transform'

interface Props {
  title: string
  onTitleClick?: () => void
  time: number
  action: React.ReactNode
}

export const UIItem: React.FC<Props> = ({ title,  onTitleClick, time, action }) => {
  return <article className="item">
    <h4 onClick={() => onTitleClick && onTitleClick()}>{title}</h4>
    <footer>
      <span className="time">
        {formatTime(time)}
      </span>
      <span className="action">
        {action}
      </span>
    </footer>
  </article>
}
