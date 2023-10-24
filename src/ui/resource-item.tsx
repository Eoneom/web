import React from 'react'
import classNames from 'classnames'

interface Props {
  icon: React.ReactNode
  value: string
  className?: string
}

export const ResourceItem: React.FC<Props> = ({ className, icon, value }) => {
  return <li className={classNames(className, 'resource-item')}>
    <div>
      {icon}
    </div>
    <div>
      {value}
    </div>
  </li>
}
